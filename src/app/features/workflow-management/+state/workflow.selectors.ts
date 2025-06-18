import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkflowState } from './workflow.state';
import { workflowEditorFeature } from './workflow.reducer';

const selectWorkflowEditorState =
  createFeatureSelector<WorkflowState>('workflowEditor');

export const selectWorkflowSteps = createSelector(
  selectWorkflowEditorState,
  (state) => state.currentWorkflow.steps
);

export const selectWorkflowDetails = createSelector(
  selectWorkflowEditorState,
  (state) => ({
    name: state.currentWorkflow.name,
    description: state.currentWorkflow.description,
  })
);

export const { selectCurrentWorkflow, selectIsLoading, selectError } =
  workflowEditorFeature;
