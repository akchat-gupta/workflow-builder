// src/app/features/workflow-management/+state/workflow.state.ts

import { Workflow } from '../../../core/models/workflow.model';

// This interface defines the shape of our feature's state
export interface WorkflowState {
  currentWorkflow: Workflow;
  isLoading: boolean;
  error: string | null;
}

// This is the initial state of our feature, the "blank slate"
export const initialWorkflowState: WorkflowState = {
  currentWorkflow: {
    id: null,
    name: 'New Onboarding Flow', // Some sensible defaults
    description: 'The standard process for all new hires.',
    steps: [], // Starts with an empty array of steps
  },
  isLoading: false,
  error: null,
};
