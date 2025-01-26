import { Task } from '../types/task'; // Task 타입이 정의된 경로로 수정

export const StorageService = {
  getTasks: (): Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },

  getProgressNotes: (taskId: number): ProgressNote[] => {
    const notes = localStorage.getItem(`progress_notes_${taskId}`);
    return notes ? JSON.parse(notes) : [];
  },

  saveProgressNotes: (taskId: number, notes: ProgressNote[]): void => {
    localStorage.setItem(`progress_notes_${taskId}`, JSON.stringify(notes));
  }
};

interface ProgressNote {
  id: number;
  taskId: number;
  note: string;
  timestamp: string;
  progressPercentage: number;
} 