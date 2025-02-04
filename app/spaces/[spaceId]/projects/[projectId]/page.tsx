"use client"
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Project } from '@/types/project';
import { Task } from '@/types/task';
import TaskList from '@/components/TaskList';
import { Button } from '@/components/ui/button';
import { StorageService } from '@/services/storage';

export default function ProjectDetailPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();
  const { spaceId, projectId } = useParams();
  const numericSpaceId = parseInt(spaceId as string);
  const numericProjectId = parseInt(projectId as string);

  useEffect(() => {
    const projects = StorageService.getProjects(numericSpaceId);
    const currentProject = projects.find(p => p.id === numericProjectId);
    if (currentProject) {
      setProject(currentProject);
      const projectTasks = StorageService.getTasks();
      setTasks(projectTasks);
    } else {
      router.push(`/spaces/${spaceId}/projects`);
    }
  }, [numericSpaceId, numericProjectId, router, spaceId]);

  const handleTaskDelete = (taskId: number) => {
    if (window.confirm('이 태스크를 삭제하시겠습니까?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      StorageService.saveTasks(updatedTasks);
    }
  };

  if (!project) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
        <p className="text-gray-600">{project.description}</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => router.push(`/spaces/${numericSpaceId}/projects/${numericProjectId}/tasks/create`)}>
          Create Task
        </Button>
      </div>

      <TaskList
        tasks={tasks}
        onTaskSelect={(task) => router.push(`/spaces/${numericSpaceId}/projects/${numericProjectId}/tasks/${task.id}`)}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
} 