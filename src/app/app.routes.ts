import { Routes } from '@angular/router';

export const routes: Routes = [
           {    path: '',
        loadComponent: ()=> import('./pages/login/login.component').then((c) => c.LoginComponent),
    },
    {    path: 'register',
        loadComponent: ()=> import('./pages/register/register.component').then((c) => c.RegisterComponent),
    },
        {    path: 'login',
        loadComponent: ()=> import('./pages/login/login.component').then((c) => c.LoginComponent),
    },

            {    path: 'tasks',
        loadComponent: ()=> import('./pages/task-list/task-list.component').then((c) => c.TaskListComponent),
    },

              {    path: 'task-form',
        loadComponent: ()=> import('./pages/task-form/task-form.component').then((c) => c.TaskFormComponent),
    },
              {    path: 'task-form/:id',
        loadComponent: ()=> import('./pages/task-form/task-form.component').then((c) => c.TaskFormComponent),
    },


    
   
];
