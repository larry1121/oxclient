"use client"
import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskDetail from '../components/TaskDetail';
import { Task } from '@/types/task';
import { StorageService } from '@/services/storage';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedTasks = StorageService.getTasks();
    setTasks(savedTasks);
  }, []);

  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    StorageService.saveTasks(updatedTasks);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTask);
    StorageService.saveTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm('정말로 이 테스크를 삭제하시겠습니까?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      StorageService.saveTasks(updatedTasks);
      if (selectedTask?.id === taskId) {
        setSelectedTask(null);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TaskForm onTaskAdd={handleAddTask} />
        <TaskList 
          tasks={tasks} 
          onTaskSelect={(task) => setSelectedTask(task)}
          onTaskDelete={handleDeleteTask}
        />
      </div>
      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
}
