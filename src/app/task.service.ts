import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksCollection;

  constructor(private firestore: Firestore) {
    this.tasksCollection = collection(this.firestore, 'tasks');
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Task) {
    return addDoc(this.tasksCollection, task);
  }

  updateTask(id: string, data: Partial<Task>) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return updateDoc(taskDoc, data);
  }

  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDoc);
  }
}
