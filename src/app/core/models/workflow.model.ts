export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  assignedTo?: string;
}

export interface Workflow {
  id: string | null;
  name: string;
  description: string;
  steps: WorkflowStep[];
}
