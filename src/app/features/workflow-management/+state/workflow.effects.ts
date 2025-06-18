// src/app/features/workflow-management/+state/workflow.effects.ts

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { WorkflowApiService } from '../services/workflow-api.service';
import { WorkflowEditorActions, WorkflowApiActions } from './workflow.actions';
import { selectCurrentWorkflow } from './workflow.selectors';

@Injectable()
export class WorkflowEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly workflowApiService = inject(WorkflowApiService);
    
  saveWorkflow$ = createEffect(() =>
    this.actions$.pipe(
      // 1. Listen for the 'Save Workflow' action from the UI
      ofType(WorkflowEditorActions.saveWorkflow),

      // 2. Get the latest version of the workflow from the store
      withLatestFrom(this.store.select(selectCurrentWorkflow)),

      // 3. Call the API service (destructure action and state)
      switchMap(([, workflow]) =>
        this.workflowApiService.saveWorkflow(workflow).pipe(
          // 4a. On success, dispatch the 'Success' action with the returned workflow
          map((savedWorkflow) =>
            WorkflowApiActions.saveWorkflowSuccess({ workflow: savedWorkflow })
          ),
          // 4b. On failure, dispatch the 'Failure' action with the error message
          catchError((error) =>
            of(WorkflowApiActions.saveWorkflowFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
