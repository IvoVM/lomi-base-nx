import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { RuntimeOptions } from 'firebase-functions'
import { fileProcessor } from './file'

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 300,
  memory: '4GB'
}

export const processBucket = functions.runWith(runtimeOpts).storage.object().onFinalize(async (object) => {
  try {
    const fileBucket = object.bucket
    const filePath = object.name
    const fileName = filePath?.split('/').pop()
    const tempFilePath = `/tmp/${fileName}`

    if (!filePath) return
    const bucket = admin.storage().bucket(fileBucket)
    await bucket.file(filePath).download({ destination: tempFilePath })

    const excelProcessResult = await fileProcessor.processFile(tempFilePath);
    console.log(excelProcessResult, "excelProcessResult")

  } catch (error) {
    console.log(error)
  }
})
