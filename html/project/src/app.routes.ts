import { Routes } from '@angular/router';
import { TasksPageComponent } from './features/tasks/pages/tasks-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];