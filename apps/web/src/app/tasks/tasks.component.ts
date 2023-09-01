import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { Firestore, collection, collectionData, limit, query, where, orderBy, deleteDoc, collectionSnapshots, docData } from '@angular/fire/firestore';
import { ButtonComponent, ModalsService } from '@lomi/material';
import { ProductUploaderComponent } from '../product-uploader/product-uploader.component';

export type CreateProductTaskName = "createProduct" | "CREATE_PRODUCT"
export type TaskName = CreateProductTaskName | "updateVariant" | "updateProduct" | "promotion" | "stock" | "product" | "removePromotion" | "taxon"

export type Task = {
  status: string;
  title?: string;
  type: TaskName;
  data: any;
  id: string;
  scheduled_at_millis?: number;
  created_at_millis?: number;
}

@Component({
  selector: 'base-front-tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent, ButtonComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  public tasks: Task[] = [];
  public pendingTasks: Task[] = [];
  public processingTasks: Task[] = [];
  public modals: ModalsService = inject(ModalsService);
  private firestore: Firestore = inject(Firestore);

  uploadExcel(type:string){
    this.modals.openModal(ProductUploaderComponent as any,{
      selectedContext: type
    })
  }

  constructor(){

    collectionSnapshots(query(collection(this.firestore, 'tasks'), limit(10), where('status','==','success') , orderBy("created_at_millis","desc"))).
    subscribe((collectionSnapshot)=>{
      this.tasks = []
      collectionSnapshot.map((doc)=>{
        doc.data()
        this.tasks.push({...doc.data(), id:doc.id} as Task)
      })
      console.log(this.tasks,"completed tasks")
    })

    collectionSnapshots(query(collection(this.firestore, 'tasks'), limit(1000), where('status','==','scheduled') , orderBy("scheduled_at_millis","asc"))).subscribe((collectionSnapshot)=>{
      this.processingTasks = []
      collectionSnapshot.map((doc)=>{
        doc.data()
        this.processingTasks.push({...doc.data(), id:doc.id} as Task)
      })
      console.log(this.processingTasks)
    })


    collectionData(query(collection(this.firestore, 'tasks'), limit(10), where('status','==','pending'), orderBy("created_at_millis","desc"))).subscribe((tasks)=>{
      console.log(tasks)
      this.pendingTasks = tasks as Task[]
    })
  }
}
