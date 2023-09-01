import * as admin from 'firebase-admin';

export type CREATE_PRODUCT = "CREATE_PRODUCT"
export type TaskName = CREATE_PRODUCT | "updateVariant" | "updateProduct" | "promotion" | "stock" | "product" | "removePromotion" | "taxon";

export type taskParams = {
    type: TaskName
    title?: string
    data: any
    id?: string
}

export class Task{
    status: string;
    title?: string;
    type: TaskName;
    data: any;
    id: string;

    constructor(task:taskParams){
        this.status = "pending"
        this.title = task.title
        this.type = task.type
        this.data = task.data
        this.id = task.id ? task.id : new Date().getTime().toString()
    }

    async updateStatus(status: string, data = {}){
        const db = admin.firestore();
        const docRef = db.collection('tasks').doc(this.id);
        await docRef.update({
            status: status,
            ...data
        });
    }

    async updateData(data: any){
        const db = admin.firestore();
        const docRef = db.collection('tasks').doc(this.id);
        await docRef.update({
            ...data
        });
    }

    async delete(){
        const db = admin.firestore();
        const docRef = db.collection('tasks').doc(this.id);
        await docRef.delete();
    }

    async save(){
        const db = admin.firestore();
        const docRef = db.collection('tasks').doc();
        console.log("Saving task ["+this.title+"] with data", {
            status: this.status,
            title: this.title ? this.title : "",
            type: this.type,
            data: this.data
        })
        await docRef.set({
            status: this.status,
            title: this.title ? this.title : "",
            type: this.type,
            data: this.data
        });
    }
}