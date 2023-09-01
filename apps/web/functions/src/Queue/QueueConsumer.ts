import * as admin from 'firebase-admin';
import { Task, taskParams } from './QueueProducer';
import { addTaxons, createNewProduct, findProductBySku, findProductBySlug, linkProductToTaxon, removeTaxons, updateProduct } from '../spree/platform/products';
import { AttachSpreeImgFromExternalUrl } from '../utils';
import { createNewVariant, getVariant, listVariantsBySku, updateVariant } from '../spree/platform/variants';
import { escape } from 'querystring';
import { createIfDoesntExistByName } from '../spree/platform/taxons';
import { createProducerIfDoesntExistByName } from '../spree/platform/producers';
import { createStockItem, setStockItem } from '../spree/platform/stockitems';
import { getStockLocation } from '../spree/platform/stock_locations';
import { getAccessToken } from '../spree/platform/auth';

export class TaskConsumer{
    taskPerIterations: number = 10;
    
    constructor(
    {
        taskPerIterations = 10
    } = {
        taskPerIterations: 1
    }){
        this.taskPerIterations = taskPerIterations
    }

    async consume(documentStatus:string){
        const db = admin.firestore();
        const tasksRef = db.collection('tasks');
        let query = tasksRef.where('status', '==', documentStatus,).orderBy('created_at_millis','desc').limit(this.taskPerIterations);
        if(documentStatus == "scheduled"){
            query = tasksRef.where('status', '==', documentStatus,).where('scheduled_at_millis', '<=', new Date().getTime()).orderBy('scheduled_at_millis','desc').limit(this.taskPerIterations);
        }
        const snapshot = await query.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        const data = snapshot.docs
        for ( const doc of data ) {
            const task = new Task({...(doc.data() as taskParams), id: doc.id})
            await this.processTask(task)
        }
    }

    async getAllSuccessTasks(){
        const db = admin.firestore();
        const tasksRef = db.collection('tasks');
        const query = tasksRef.where('status', '==', 'success');
        const snapshot = await query.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        const data = snapshot.docs
        return data
    }

    async deleteAllTasks(){
        const db = admin.firestore();
        const tasksRef = db.collection('tasks');
        const query = tasksRef.where('status', "!=", 'success').limit(this.taskPerIterations);
        const snapshot = await query.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        const data = snapshot.docs
        console.log(data[0])
        await Promise.all(data.map(async doc => {
            await doc.ref.delete()
            console.log("Task deleted") 
        }));
    }

    async setSodexoTaxonTask(task:Task){
        const product = await findProductBySku(task.data.master_sku)
        if(product.data.products.length > 0){
            const productId = product.data.products[0].id
            await linkProductToTaxon(productId, [2089])
        }
    }

    async createProductTask(task:Task){
        task.data.name = escape(task.data.name)
        task.data.description = escape(task.data.description)
        const productExits = await findProductBySku((""+task.data.ean).split("-")[0])
        const parentTaxon = await createIfDoesntExistByName(escape(task.data.tags[0]))
        const currentTaxon = parentTaxon.id ? await createIfDoesntExistByName(escape(task.data.tags[1]), parentTaxon.id) : await createIfDoesntExistByName(escape(task.data.tags[0]), 2894)
        const stockLocation = task.data.stock_locations ? await getStockLocation(task.data.stock_locations[0]) : null
        const producer = await createProducerIfDoesntExistByName(escape(task.data.producer));
        let product:any = {}
        if(productExits && productExits.length > 0){
            const products = productExits
            console.log("Product already exists", products)
            product = products[0]
            console.log("Updating product", product.id,product.store_ids,"with data", task.data)
            await updateProduct({
                name: task.data.name,
                description: task.data.description,
                price: task.data.price,
                producer_id: producer.id,
                store_id: stockLocation ? stockLocation.stores[0][0].id : 1,
            }, product.id)
            if(currentTaxon.id){
                await addTaxons(product.id, "")
            }
            console.log("Product updated", product.id, product.name)
        } else {
            product = await createNewProduct({
                name: task.data.name,
                description: task.data.description,
                price: task.data.price,
                ean: task.data.master_sku,
                shipping_category_id: 2,
                master_sku: task.data.master_sku+"-"+task.data.stock_locations[0],
                producer: producer.id,
                store_id: stockLocation ? stockLocation.stores[0][0].id : 1,
                tags : [currentTaxon.id]
            });
        }
        if(product.slug && task.data.stock_locations){
            const stock_location_id = task.data.stock_locations[0]
            const variants = await listVariantsBySku((task.data.ean+"").split("-")[0],)
            if(variants && variants.length > 0){
                const stockLocationVariant = variants.find((variant:any) => variant.stock_items.length && (variant.stock_items[0].stock_location_id == stock_location_id))
                console.log("Stock location variant", stockLocationVariant, variants.stock_items[0], stock_location_id)
                if(stockLocationVariant){
                    await updateVariant({
                        id: stockLocationVariant.id,
                        price: task.data.price,
                    })
                    if(stockLocationVariant.stock_items[0]){
                        await setStockItem(stock_location_id, stockLocationVariant.stock_items[0].id , task.data.stock)
                    } else {
                        await createStockItem(stock_location_id, stockLocationVariant.id, task.data.stock)
                    }
                    await task.updateData({
                        updatedData: {
                            price: task.data.price,
                            variantId: stockLocationVariant.id,
                            stockItem: stockLocationVariant.stock_items[0].id,
                            stock: task.data.stock
                        }
                    })
                    return
                } else {
                    const newVariant = await createNewVariant({
                        price: task.data.price,
                        sku: task.data.master_sku.split("-")[0]+"-"+stock_location_id,
                        slug: product.slug,
                        ean: task.data.ean
                    })
                    await createStockItem(stock_location_id, newVariant.id, task.data.stock)
                    await task.updateData({
                        updatedData: {
                            price: task.data.price,
                            newVariant: newVariant.id,
                            stockItem: newVariant.stock_items[0].id,
                            stock: task.data.stock
                        }
                    })
                }
            }
            await Promise.all(task.data.images.map(async (cdn:string) => {
                AttachSpreeImgFromExternalUrl(product.slug,cdn)
            }))
        }
        if(!product.id){
            throw new Error("Product not created")
        }
        await addTaxons(product.id, currentTaxon.id)
        console.log(product)
        await task.updateData({
            taxonLinked: task.data.tags,
        })
        await task.updateStatus("success")
    }

    async doStockTask(task:Task){
        const variant = await getVariant(task.data.id)
        const stockItem = variant.stock_items[0]
        const setStockRes = await setStockItem(stockItem.id, stockItem.stock_location_id, task.data.stock)
        if(setStockRes.id){
            await task.updateStatus("success")
            await task.updateData({
                updatedData: {
                    stock: task.data.stock
                }
            })
        }
    }

   async doPromotionTask(task:Task){
        const variant = await getVariant(task.data.id)
        if(!variant?.id){
            task.updateData({
                error: "Variant not found",
                status: "failed"
            })
            return
        }
        const promotionTaxonId = task.data.promotionTaxon
        const product = await findProductBySlug(variant.slug)
        if(product && product.slug){
            await addTaxons(product.slug, ''+promotionTaxonId)
            await updateVariant(
                {
                    id: variant.id,
                    price: task.data.price,
                    compare_at_price: task.data.compare_at_price
                }
            )
            await task.updateStatus("success")
            await task.updateData({
                updatedData: {
                    price: task.data.price,
                    linkedToTaxon: promotionTaxonId
                }
            })
        }
    }

    async removePromotionTask(task:Task){
        const variant = await getVariant(task.data.id)
        if(!variant?.id){
            task.updateData({
                error: "Variant not found",
                status: "failed"
            })
            return
        }
        const promotionTaxonId = task.data.promotionTaxon
        const product = await findProductBySlug(variant.slug)
        if(product && product.slug){
            await removeTaxons(product.slug, ''+promotionTaxonId)
            await updateVariant({
                id: variant.id,
                price: task.data.compare_at_price,
            })
            await task.updateStatus("success")
            await task.updateData({
                updatedData: {
                    price: task.data.compare_at_price,
                    unLinkedToTaxon: promotionTaxonId
                }
            })
        }
    }

    async linkProductToTaxonTask(task:Task){
        const productId = task.data.productId
        const taxonId = task.data.tags[0]
        if(productId){
            await addTaxons(productId,taxonId)
            await task.updateStatus("success")
            await task.updateData({
                updatedData: {
                    taxonId: task.data.taxonId
                }
            })
        }
    }

   async processTask(task:Task){
        const accessToken = await getAccessToken()
        console.log("Acessed", accessToken)
        console.log("Processing task", task.type)
        try{
            switch (task.type) {
                case "product":
                    await task.updateStatus("processing")
                    await this.createProductTask(task);
                    break;
                case "CREATE_PRODUCT":
                    await task.updateStatus("processing")
                    await this.createProductTask(task);
                    break;
                case "promotion":
                    await task.updateStatus("processing")
                    await this.doPromotionTask(task);
                    break;
                case "removePromotion":
                    await task.updateStatus("processing")
                    await this.removePromotionTask(task);
                case "taxon":
                    await task.updateStatus("processing")
                    await this.linkProductToTaxonTask(task);
                case "stock":
                    await task.updateStatus("processing")
                    await this.doStockTask(task);
                    break;
                }
            return {
                status: "success",
                type: task.type
            };
        } catch (error) {
            console.log("[Error processing task] ", error)
            task.updateStatus("error", {
                error: error
            })
            return error
        }
    }
}