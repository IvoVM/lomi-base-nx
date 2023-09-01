import { TaskConsumer } from "./QueueConsumer";
import * as functions from 'firebase-functions';

const runtimeOpts: functions.RuntimeOptions = {
    timeoutSeconds: 300,
    memory: '4GB'
  }

export const consumerCronJob = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
    const taskConsumer = new TaskConsumer({taskPerIterations: 25});
    await taskConsumer.consume("pending")
});

export const scheduledConsumerCronJob = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
    const taskConsumer = new TaskConsumer({taskPerIterations: 25});
    await taskConsumer.consume("scheduled")
});


export const deleteAllTasks = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
    const taskConsumer = new TaskConsumer();
    await taskConsumer.deleteAllTasks()
    res.send("Tasks deleted")
});

export const getSuccessTasks = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
    const taskConsumer = new TaskConsumer();
    await taskConsumer.getAllSuccessTasks()
    res.send({
        tasks: taskConsumer.getAllSuccessTasks(),
        ids: (await taskConsumer.getAllSuccessTasks())?.map(doc => doc.data().newProduct?.id)
    })
});