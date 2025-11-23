
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Task, TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule]
})
export class TaskFormComponent {
  form: FormGroup;
  taskId?: number;
  submitted = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    // private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      dueDate: ['', [Validators.required, this.futureDateValidator]],
      status: ['Pending', Validators.required],
      userId: [localStorage.getItem('userId')]
    });
  }

  ngOnInit(): void {
  this.taskId = Number(this.route.snapshot.paramMap.get('id'));
  this.taskService.getallTasks().subscribe(tasks => {
    const task = tasks.find(t => t.id === this.taskId);
    if (task) {
      this.form.patchValue(task);
    } else {
      // optional: handle task not found
      // this.message = 'Task not found';
      this.messageType = 'error';
    }
  });
  }

  futureDateValidator(control: AbstractControl) {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today ? null : { futureDate: true };
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.message = 'Please fix the errors in the form.';
      this.messageType = 'error';
      return;
    }

    const task: Task = { ...this.form.value, userId: Number(localStorage.getItem('userId')) };

    if (this.taskId) {
      task.id = this.taskId;
      this.taskService.updateTask(task).subscribe({
        next: () => {
          this.message = 'Task updated successfully!';
          this.messageType = 'success';
        },
        error: (err) => {
          this.message = err.error || 'Failed to update task.';
          this.messageType = 'error';
        }
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => {
          this.message = 'Task added successfully!';
          this.messageType = 'success';
          this.form.reset({ status: 'Pending', userId: localStorage.getItem('userId') });
          this.submitted = false;
        },
        error: (err) => {
          this.message = err.error || 'Failed to add task.';
          this.messageType = 'error';
        }
      });
    }
  }
}
