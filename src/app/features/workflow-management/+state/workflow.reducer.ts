import { createFeature, createReducer, on } from '@ngrx/store';
import { initialWorkflowState } from './workflow.state';
import { WorkflowEditorActions } from './workflow.actions';
export const WORKFLOW_EDITOR_FEATURE_KEY = 'workflowEditor';

export const workflowEditorFeature = createFeature({
  name: WORKFLOW_EDITOR_FEATURE_KEY, 
  reducer: createReducer(
    initialWorkflowState,
    on(WorkflowEditorActions.addStep, (state) => {
      const newStep = {
        id: `step_${Date.now()}`,
        title: 'New Step',
        description: ''
      };
      return {
        ...state,
        currentWorkflow: {
          ...state.currentWorkflow,
          steps: [...state.currentWorkflow.steps, newStep]
        }
      };
    })
  ),
});