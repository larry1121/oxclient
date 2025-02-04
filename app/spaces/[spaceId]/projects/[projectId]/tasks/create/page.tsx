"use client"
import { useRouter, useParams } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types/task';
import { StorageService } from '@/services/storage';

export default function CreateTaskPage() {
  const router = useRouter();
  const { spaceId, projectId } = useParams();
  const numericSpaceId = parseInt(spaceId as string);
  const numericProjectId = parseInt(projectId as string);

  const handleAddTask = (newTask: Task) => {
    const tasks = StorageService.getTasks();
    const updatedTasks = [...tasks, newTask];
    StorageService.saveTasks(updatedTasks);
    router.push(`/spaces/${numericSpaceId}/projects/${numericProjectId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <TaskForm 
        spaceId={numericSpaceId} 
        projectId={numericProjectId} 
        onTaskAdd={handleAddTask} 
      />
    </div>
  );
} 