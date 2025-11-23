
import { Component, inject } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: string = '';

  private router = inject(Router);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  //loading all task in list 

  loadTasks() {
    this.taskService.getallTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  // filter by status 

  applyFilter() {
    if (!this.filter) {
      this.filteredTasks = this.tasks;
      return;
    }

    this.filteredTasks = this.tasks.filter(
      task => task.status === this.filter
    );
  }

  //delete task by task's id 

  deleteTask(id: number) {
    if (!confirm('Are you sure?')) return;

    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  //edit task by task's id 
  editTask(id: number | undefined) {
    if (!id) return;
    this.router.navigate(['/task-form', id]);
  }
}
