import { createFeature, createReducer, on } from '@ngrx/store';
import { initialWorkflowState } from './workflow.state';
import { WorkflowApiActions, WorkflowEditorActions } from './workflow.actions';
export const WORKFLOW_EDITOR_FEATURE_KEY = 'workflowEditor';

export const workflowEditorFeature = createFeature({
  name: WORKFLOW_EDITOR_FEATURE_KEY,
  reducer: createReducer(
    initialWorkflowState,
    on(
      WorkflowEditorActions.updateWorkflowDetails,
      (state, { name, description }) => {
        return {
          ...state,
          currentWorkflow: {
            ...state.currentWorkflow,
            name,
            description,
          },
        };
      }
    ),
    on(WorkflowEditorActions.updateStep, (state, { stepIndex, step }) => {
      const updatedSteps = state.currentWorkflow.steps.map(
        (originalStep, index) => {
          if (index !== stepIndex) {
            return originalStep;
          }
          return { ...originalStep, ...step };
        }
      );

      return {
        ...state,
        currentWorkflow: { ...state.currentWorkflow, steps: updatedSteps },
      };
    }),
    on(WorkflowEditorActions.deleteStep, (state, { stepIndex }) => {
      const filteredSteps = state.currentWorkflow.steps.filter(
        (_, index) => index !== stepIndex
      );

      return {
        ...state,
        currentWorkflow: { ...state.currentWorkflow, steps: filteredSteps },
      };
    }),
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
    }),
    // When the save process starts
    on(WorkflowEditorActions.saveWorkflow, (state) => ({
      ...state,
      isLoading: true,
      error: null, // Clear previous errors
    })),

    // When the API call succeeds
    on(WorkflowApiActions.saveWorkflowSuccess, (state, { workflow }) => ({
      ...state,
      currentWorkflow: workflow, // Update state with the saved workflow (it might have a new ID)
      isLoading: false,
    })),

    // When the API call fails
    on(WorkflowApiActions.saveWorkflowFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }))
  ),
});
