"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskDetail from '@/components/TaskDetail';
import { Task } from '@/types/task';
import { StorageService } from '@/services/storage';

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const taskId = parseInt(params.id);

  useEffect(() => {
    const tasks = StorageService.getTasks();
    const foundTask = tasks.find(t => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
    } else {
      router.push('/tasks');
    }
  }, [taskId, router]);

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
        onClose={() => router.push('/tasks')}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
} 