import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {
  tasks: Task[] = [];
  newTask: string = '';
  dueDate: string = '';
  showError: boolean = false;
  errorMessage: string = '';
  today: string = new Date().toISOString();

  constructor() {}

  validateTask(): boolean {
    if (!this.newTask.trim()) {
      this.errorMessage = 'El nombre de la tarea es requerido';
      this.showError = true;
      return false;
    }
    if (!this.dueDate) {
      this.errorMessage = 'La fecha de entrega es requerida';
      this.showError = true;
      return false;
    }
    this.showError = false;
    this.errorMessage = '';
    return true;
  }

  addTask() {
    if (!this.validateTask()) return;

    const task: Task = {
      id: Date.now(),
      text: this.newTask.trim(),
      completed: false,
      dueDate: this.dueDate
    };

    this.tasks.push(task);
    this.resetForm();
  }

  resetForm() {
    this.newTask = '';
    this.dueDate = '';
    this.showError = false;
    this.errorMessage = '';
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  getTaskStatus(task: Task): string {
    if (task.completed) return 'completed';
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today ? 'overdue' : '';
  }

  onDateChange(event: any) {
    this.dueDate = event.detail.value;
  }
}