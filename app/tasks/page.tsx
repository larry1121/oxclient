"use client"
import { useState, useEffect } from 'react';
import TaskList from '@/components/TaskList';
import { Task } from '@/types/task';
import { StorageService } from '@/services/storage';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedTasks = StorageService.getTasks();
    setTasks(savedTasks);
  }, []);

  const handleTaskDelete = (taskId: number) => {
    if (window.confirm('정말로 이 테스크를 삭제하시겠습니까?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      StorageService.saveTasks(updatedTasks);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onClick={() => router.push('/tasks/create')}>
          Create Task
        </Button>
      </div>
      <TaskList 
        tasks={tasks} 
        onTaskSelect={(task) => router.push(`/tasks/${task.id}`)}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
} 