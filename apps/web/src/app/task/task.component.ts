import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../tasks/tasks.component';
import { MatIconModule } from '@angular/material/icon';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'lm-task',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  private firestore:Firestore = inject(Firestore);

  @Input() task: Task = {
    status: "pending",
    title: "",
    type: "createProduct",
    data: {},
    id: ""
  }

  deleteTask(){
    console.log(this.task)
    if(window.confirm("Realmente deseas eliminar esta tarea? ( "+(this.task.data.name || this.task.data.id)+" )")){
      deleteDoc(doc(this.firestore, 'tasks', this.task.id))
    }
  }
}
