import * as XLSX from 'xlsx'
import { MutableProduct } from './propsConvertor';
import { Task } from './Queue/QueueProducer';

interface FileProcessingStrategy {
    processFile(filePath: string): Promise<void>;
}

type XLSXData<Type> = Type[]
  
class XLSXProcessingStrategy implements FileProcessingStrategy {
    async processFile(filePath: string): Promise<void> {
        console.log("[ Processing XLSX file ] ", filePath)

        const workbook = XLSX.readFile(filePath)
        console.log("[ Processing XLSX file ] ", workbook.SheetNames)
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = XLSX.utils.sheet_to_json(sheet)
        if(data){
            await this.dispatchData(data)
        }
    }

    async dispatchData(data: XLSXData<any>){
        const firstItem = data[0];
        console.log("[ Dispatching data ] ", firstItem)
        if(firstItem){
            //Logic for creating new products
            
            const spreeProductCandidates = data.map((product) => {
                return new MutableProduct(product)
            })
            console.log("[ Creating new mutable product ] ", spreeProductCandidates.map((product) => product.toSpreeProductParams()))

            await Promise.all(spreeProductCandidates.map(async (product: MutableProduct<any>) => {
                const spreeProduct = product.toSpreeProductParams();
                if(spreeProduct){
                    const creteProductTask = new Task({
                        type: "CREATE_PRODUCT",
                        data: spreeProduct
                    })
                    await creteProductTask.save()
                } else {
                    console.log("[ Not a spree product ] ", product)
                }
            }))
        }
    }
  }
  
class FileProcessor {
    private strategyMap: { [extension: string]: FileProcessingStrategy } = {
      'xlsx': new XLSXProcessingStrategy(),
    };
  
    async processFile(filePath: string): Promise<{
        status: string;
        strategy: FileProcessingStrategy | undefined;
    }> {
        console.log("[Processing file] ", filePath)

        const extension = this.detectFileExtension(filePath) || '';
        const strategy = this.strategyMap[extension];
        if (strategy) {
            await strategy.processFile(filePath);
        } else {
            this.defaultStrategy(filePath);
        }
        return {
            status: "success",
            strategy: strategy,
        }
    }

    private detectFileExtension(filePath: string){
        const fileName = filePath
        const fileExtension = fileName?.split('.').pop()?.toLowerCase()
        console.log("[Detected file extension] ", fileExtension)
        if (fileExtension === 'xlsx') {
          return 'xlsx'
        }
        return false
    }
  
    private defaultStrategy(filePath: string): void {
        console.log("[Default strategy] ", filePath)
    }
  }
  
  export const fileProcessor = new FileProcessor();