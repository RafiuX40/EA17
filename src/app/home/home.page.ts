import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskService, Task } from '../task.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';
  dueDate: string = '';
  today: string = new Date().toISOString();
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask() {
    if (!this.newTask.trim()) {
      this.showError = true;
      this.errorMessage = 'La tarea no puede estar vacía';
      return;
    }

    this.showError = false;
    const task: Task = {
      id: '',
      title: this.newTask,
      completed: false,
      dueDate: this.dueDate
    };

    this.taskService.addTask(task).then(() => {
      this.newTask = '';
      this.dueDate = '';
    });
  }

  toggleTask(task: Task) {
    this.taskService.updateTask(task.id, { completed: task.completed });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  onDateChange(event: any) {
    this.dueDate = event.detail.value;
  }
}
