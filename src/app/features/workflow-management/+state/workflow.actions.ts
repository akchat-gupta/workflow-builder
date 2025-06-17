// src/app/features/workflow-management/+state/workflow.actions.ts
import { createActionGroup, emptyProps } from '@ngrx/store';

// Using createActionGroup is the modern, recommended way to organize actions
export const WorkflowEditorActions = createActionGroup({
  source: 'Workflow Editor Page', // A description of where the actions are dispatched from
  events: {
    // Add a new step. For now, it doesn't need a payload.
    'Add Step': emptyProps(),
  }
});