export interface SubTask {
  id: number;
  parentTaskId: number;
  title: string;
  assignee: string;
  priority: string;
  status: string;
  dueDate: string;
  description?: string;
}

export interface Task {
  id: number;
  assignee: string;
  in_project_id: number;
  in_project_name: string;
  status: string;
  priority: string;
  task_due_date: string;
  ox_due_date: string;
  task_title: string;
  project_overview: string;
  description: string;
  detail_tasks: string[];
  expected_outcome: string;
  metric: string;
  space: string;
  category: string;
  progress?: number;
  subTasks?: SubTask[];
  evaluation?: TaskEvaluation;
  project_id: number;
  space_id: number;
} 


export interface TaskSubmissionData {
  resultReport: string;
  executionResult: string;
  attachments: string[];
}

export interface TaskEvaluation {
  isSubmitted: boolean;
  submittedAt?: string;
  evaluatedAt?: string;
  score?: 'O' | 'X';
  feedback?: string;
  evaluator?: string;
  submissionData?: TaskSubmissionData;
  history: TaskEvaluationHistory[];
}

export interface TaskEvaluationHistory {
  submittedAt: string;
  evaluatedAt: string;
  submissionData: TaskSubmissionData;
  score: 'O' | 'X';
  feedback: string;
  evaluator: string;
}