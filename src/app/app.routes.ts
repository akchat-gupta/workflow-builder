import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'workflows',
    // This function dynamically imports the module when the route is activated
    loadChildren: () =>
      import('./features/workflow-management/workflow-management.module').then(
        (m) => m.WorkflowManagementModule
      ),
  },
  {
    path: 'my-tasks',
    loadChildren: () =>
      import('./features/user-task-board/user-task-board.module').then(
        (m) => m.UserTaskBoardModule
      ),
  },
  // Default and wildcard routes remain the same
  {
    path: '',
    redirectTo: '/my-tasks',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/my-tasks',
  },
];
