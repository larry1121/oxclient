import { Task } from '../types/task'; // Task 타입이 정의된 경로로 수정
import { Project } from '../types/project';
import { Space } from '@/types/space';

export interface ProgressNote {
  id: number;
  taskId: number;
  note: string;
  timestamp: string;
  progressPercentage: number;
}

// Define a specific type for Space.

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
  },

  getProjects: (spaceId: number): Project[] => {
    const projects = localStorage.getItem(`projects_${spaceId}`);
    return projects ? JSON.parse(projects) : [];
  },

  saveProjects: (spaceId: number, projects: Project[]): void => {
    localStorage.setItem(`projects_${spaceId}`, JSON.stringify(projects));
  },

  // Updated to use the Space type instead of any.
  getSpaces: (): Space[] => {
    const spaces = localStorage.getItem('spaces');
    if (!spaces) return [];
    // Parse and assert the type to Space[]
    return JSON.parse(spaces) as Space[];
  },

  saveSpaces: (spaces: Space[]): void => {
    localStorage.setItem('spaces', JSON.stringify(spaces));
  }
}; 