"use client"
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TaskDetail from '@/components/TaskDetail';
import { Task } from '@/types/task';
import { StorageService } from '@/services/storage';

export default function TaskDetailPage() {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const { spaceId, projectId, taskId } = useParams();
  const numericSpaceId = parseInt(spaceId as string);
  const numericProjectId = parseInt(projectId as string);
  const numericTaskId = parseInt(taskId as string);

  useEffect(() => {
    const tasks = StorageService.getTasks();
    const foundTask = tasks.find(t => t.id === numericTaskId);
    if (foundTask) {
      setTask(foundTask);
    } else {
      router.push(`/spaces/${numericSpaceId}/projects/${numericProjectId}`);
    }
  }, [numericTaskId, router, numericSpaceId, numericProjectId]);

  const handleUpdateTask = (updatedTask: Task) => {
    const tasks = StorageService.getTasks();
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    StorageService.saveTasks(updatedTasks);
    setTask(updatedTask);
  };

  if (!task) return null;

  return (
    <div className="container mx-auto py-8">
      <TaskDetail
        task={task}
        onClose={() => router.push(`/spaces/${numericSpaceId}/projects/${numericProjectId}`)}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
} 