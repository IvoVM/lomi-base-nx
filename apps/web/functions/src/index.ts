import {initializeApp} from "firebase-admin/app";
initializeApp();

import * as FunctionsSDK from "./fileUpload";
export const processBucket = FunctionsSDK.processBucket;

import { consumerCronJob, deleteAllTasks, getSuccessTasks, scheduledConsumerCronJob } from "./Queue/QueueFunction";
export const TaskConsumer = consumerCronJob;
export const ScheduledTaskConsumer = scheduledConsumerCronJob;
export const DeleteAllTasks = deleteAllTasks;
export const GetSuccessTasks = getSuccessTasks;