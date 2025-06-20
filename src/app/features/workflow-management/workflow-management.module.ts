// src/app/features/workflow-management/workflow-management.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { WorkflowManagementRoutingModule } from './workflow-management-routing.module';

@NgModule({
  declarations: [WorkflowListComponent],
  imports: [CommonModule, WorkflowManagementRoutingModule, ReactiveFormsModule],
})
export class WorkflowManagementModule {}
