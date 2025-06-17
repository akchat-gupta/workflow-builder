// src/app/features/workflow-management/+state/workflow.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialWorkflowState } from './workflow.state';
import { WorkflowEditorActions } from './workflow.actions';

export const workflowReducer = createReducer(
  initialWorkflowState,
  on(WorkflowEditorActions.addStep, (state) => {
    const newStep = {
      id: `step_${Date.now()}`,
      title: 'New Step',
      description: '',
    };
    return {
      ...state,
      currentWorkflow: {
        ...state.currentWorkflow,
        steps: [...state.currentWorkflow.steps, newStep],
      },
    };
  })
);
