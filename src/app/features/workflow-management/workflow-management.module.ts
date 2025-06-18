import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowManagementRoutingModule } from './workflow-management-routing.module';
import { workflowReducer } from './+state/workflow.reducer';
import { StoreModule } from '@ngrx/store';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';

@NgModule({
  declarations: [WorkflowListComponent],
  imports: [
    CommonModule,
    WorkflowManagementRoutingModule,
    StoreModule.forFeature('workflowEditor', workflowReducer),
  ],
})
export class WorkflowManagementModule {}
