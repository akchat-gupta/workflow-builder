import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WorkflowStep } from '../../../core/models/workflow.model';

export const WorkflowEditorActions = createActionGroup({
  source: 'Workflow Editor Page',
  events: {
    'Update Workflow Details': props<{ name: string; description: string }>(),
    'Add Step': emptyProps(),
    'Update Step': props<{ stepIndex: number; step: Partial<WorkflowStep> }>(),
    'Delete Step': props<{ stepIndex: number }>(),
  }
});