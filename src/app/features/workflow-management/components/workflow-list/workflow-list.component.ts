import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectWorkflowSteps } from '../../+state/workflow.selectors';
import { WorkflowEditorActions } from '../../+state/workflow.actions';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss',
  standalone: false,
})
export class WorkflowListComponent {
  private readonly store = inject(Store);
  steps$ = this.store.select(selectWorkflowSteps);
  onAddStep() {
    this.store.dispatch(WorkflowEditorActions.addStep());
  }
}
