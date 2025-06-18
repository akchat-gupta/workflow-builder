import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentWorkflow,
  selectWorkflowSteps,
} from '../../+state/workflow.selectors';
import { WorkflowEditorActions } from '../../+state/workflow.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss',
  standalone: false,
})
export class WorkflowListComponent {
  private readonly store = inject(Store);

  workflowForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  steps$ = this.store.select(selectWorkflowSteps);

  workflow$ = this.store.select(selectCurrentWorkflow);

  onAddStep() {
    this.store.dispatch(WorkflowEditorActions.addStep());
  }
}
