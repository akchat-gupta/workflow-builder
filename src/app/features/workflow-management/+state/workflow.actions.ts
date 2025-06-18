import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const WorkflowEditorActions = createActionGroup({
  source: 'Workflow Editor Page',
  events: {
    'Update Workflow Details': props<{ name: string; description: string }>(),
    'Add Step': emptyProps(),
  }
});