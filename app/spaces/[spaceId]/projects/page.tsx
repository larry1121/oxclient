"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types/project';
import ProjectList from '@/components/ProjectList';
import { Button } from '@/components/ui/button';
import { StorageService } from '@/services/storage';

export default function ProjectsPage({ params }: { params: { spaceId: string } }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();
  const spaceId = parseInt(params.spaceId);

  useEffect(() => {
    const savedProjects = StorageService.getProjects(spaceId);
    setProjects(savedProjects);
  }, [spaceId]);

  const handleProjectDelete = (projectId: number) => {
    if (window.confirm('이 프로젝트를 삭제하시겠습니까?')) {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      StorageService.saveProjects(spaceId, updatedProjects);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => router.push(`/spaces/${spaceId}/projects/create`)}>
          Create Project
        </Button>
      </div>
      <ProjectList 
        spaceId={spaceId}
        projects={projects}
        onProjectDelete={handleProjectDelete}
      />
    </div>
  );
} 