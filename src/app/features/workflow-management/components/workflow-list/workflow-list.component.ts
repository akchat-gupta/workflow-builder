import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentWorkflow,
  selectWorkflowSteps,
} from '../../+state/workflow.selectors';
import { WorkflowEditorActions } from '../../+state/workflow.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  take,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss',
  standalone: false,
})
export class WorkflowListComponent {
  private readonly store = inject(Store);
  private destroy$ = new Subject<void>();

  workflowForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  steps$ = this.store.select(selectWorkflowSteps);

  ngOnInit(): void {
    this.syncStoreToForm();
    this.syncFormToStore();
  }

  private syncFormToStore(): void {
    this.workflowForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$)
      )
      .subscribe((formValue) => {
        this.store.dispatch(
          WorkflowEditorActions.updateWorkflowDetails({
            name: formValue.name ?? '',
            description: formValue.description ?? '',
          })
        );
      });
  }

  private syncStoreToForm(): void {
    this.store
      .select(selectCurrentWorkflow)
      .pipe(take(1))
      .subscribe((workflow) => {
        if (workflow) {
          this.workflowForm.patchValue({
            name: workflow.name,
            description: workflow.description,
          });
        }
      });
  }

  onAddStep() {
    this.store.dispatch(WorkflowEditorActions.addStep());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
