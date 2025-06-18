import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Workflow, WorkflowStep } from '../../../core/models/workflow.model';

export const WorkflowEditorActions = createActionGroup({
  source: 'Workflow Editor Page',
  events: {
    'Update Workflow Details': props<{ name: string; description: string }>(),
    'Add Step': emptyProps(),
    'Update Step': props<{ stepIndex: number; step: Partial<WorkflowStep> }>(),
    'Save Workflow': emptyProps(),
    'Delete Step': props<{ stepIndex: number }>(),
  },
});

export const WorkflowApiActions = createActionGroup({
  source: 'Workflow API',
  events: {
    'Save Workflow Success': props<{ workflow: Workflow }>(),
    'Save Workflow Failure': props<{ error: string }>(),
  },
});
