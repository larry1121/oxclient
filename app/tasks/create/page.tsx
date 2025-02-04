"use client"
import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types/task';
import { StorageService } from '@/services/storage';

export default function CreateTaskPage() {
  const router = useRouter();

  const handleAddTask = (newTask: Task) => {
    const tasks = StorageService.getTasks();
    const updatedTasks = [...tasks, newTask];
    StorageService.saveTasks(updatedTasks);
    router.push('/tasks');
  };

  return (
    <div className="container mx-auto py-8">
      <TaskForm onTaskAdd={handleAddTask} />
    </div>
  );
} 