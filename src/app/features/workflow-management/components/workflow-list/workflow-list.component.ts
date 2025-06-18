import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentWorkflow,
  selectWorkflowSteps,
} from '../../+state/workflow.selectors';
import { WorkflowEditorActions } from '../../+state/workflow.actions';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { WorkflowStep } from '../../../../core/models/workflow.model';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss',
  standalone: false,
})
export class WorkflowListComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private destroy$ = new Subject<void>();

  workflowForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    steps: this.fb.array([]),
  });

  get steps(): FormArray {
    return this.workflowForm.get('steps') as FormArray;
  }

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

        formValue.steps?.forEach((step, index) => {
          this.store.dispatch(
            WorkflowEditorActions.updateStep({
              stepIndex: index,
              step: step as Partial<WorkflowStep>,
            })
          );
        });
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

          this.steps.clear();
          workflow.steps.forEach((step) => {
            this.steps.push(this.createStepFormGroup(step));
          });
        }
      });
  }

  private createStepFormGroup(step: WorkflowStep): FormGroup {
    return this.fb.group({
      title: [step.title, Validators.required],
      description: [step.description],
    });
  }

  onAddStep() {
    this.store.dispatch(WorkflowEditorActions.addStep());
    this.steps.push(
      this.createStepFormGroup({ id: '', title: 'New Step', description: '' })
    );
  }

  onDeleteStep(index: number): void {
    this.store.dispatch(WorkflowEditorActions.deleteStep({ stepIndex: index }));
    this.steps.removeAt(index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
