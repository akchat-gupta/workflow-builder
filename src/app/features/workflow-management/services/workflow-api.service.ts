import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { Workflow } from '../../../core/models/workflow.model';

@Injectable({
  providedIn: 'root',
})
export class WorkflowApiService {
  constructor() {}

  saveWorkflow(workflow: Workflow): Observable<Workflow> {
    console.log('[WorkflowApiService] Saving workflow:', workflow);

    const workflowWithId: Workflow = {
      ...workflow,
      id: workflow.id ?? `wf_${Date.now()}`,
    };

    return of(workflowWithId).pipe(
      delay(1000),
      tap((savedWorkflow) => {
        console.log('[WorkflowApiService] Successfully saved:', savedWorkflow);
      })
    );
  }
}
