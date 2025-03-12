import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class HomePage {
  userForm: FormGroup;
  users: User[] = [];
  isEditing = false;
  editingUserId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]]
    });
  }

  submitUser(): void {
    if (this.userForm.valid) {
      if (this.isEditing && this.editingUserId !== null) {
        const userIndex = this.users.findIndex(u => u.id === this.editingUserId);
        if (userIndex !== -1) {
          this.users[userIndex] = {
            id: this.editingUserId,
            ...this.userForm.value
          };
        }
      } else {
        const newUser: User = {
          id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id ?? 0)) + 1 : 1,
          ...this.userForm.value
        };
        this.users.push(newUser);
      }
      this.resetForm();
    }
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.editingUserId = user.id ?? null;
    this.userForm.patchValue(user);
  }

  deleteUser(userId: number | undefined): void {
    if (userId !== undefined) {
      this.users = this.users.filter(u => u.id !== userId);
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.isEditing = false;
    this.editingUserId = null;
  }

  trackByUserId(index: number, user: User): number {
    return user.id ?? index;
  }
}