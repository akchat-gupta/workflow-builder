// src/app/features/workflow-management/+state/workflow.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkflowState } from './workflow.state';

// 1. Feature Selector: This selects the entire 'workflowEditor' state slice.
// The string 'workflowEditor' MUST match the name you used in the module's forFeature registration.
const selectWorkflowEditorState =
  createFeatureSelector<WorkflowState>('workflowEditor');

// 2. Projector Selector: This uses the feature selector to get a specific piece of the state.
// It's efficient because it will only re-run if the `currentWorkflow.steps` data changes.
export const selectWorkflowSteps = createSelector(
  selectWorkflowEditorState,
  (state) => state.currentWorkflow.steps
);

// We'll also create a selector for the workflow's name and description for later use.
export const selectWorkflowDetails = createSelector(
  selectWorkflowEditorState,
  (state) => ({
    name: state.currentWorkflow.name,
    description: state.currentWorkflow.description,
  })
);
