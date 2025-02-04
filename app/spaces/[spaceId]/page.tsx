"use client"
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Space } from '@/types/space';
import { Project } from '@/types/project';
import ProjectList from '@/components/ProjectList';
import { Button } from '@/components/ui/button';
import { StorageService } from '@/services/storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SpaceDetailPage() {
  const [space, setSpace] = useState<Space | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();
  const { spaceId } = useParams();
  const numericSpaceId = parseInt(spaceId as string);

  useEffect(() => {
    const spaces = StorageService.getSpaces();
    const currentSpace = spaces.find(s => s.id === numericSpaceId);
    if (currentSpace) {
      setSpace(currentSpace);
      const spaceProjects = StorageService.getProjects(numericSpaceId);
      setProjects(spaceProjects);
    } else {
      router.push('/spaces');
    }
  }, [numericSpaceId, router]);

  const handleProjectDelete = (projectId: number) => {
    if (window.confirm('이 프로젝트를 삭제하시겠습니까?')) {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      StorageService.saveProjects(numericSpaceId, updatedProjects);
    }
  };

  if (!space) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
        <p className="text-gray-600">{space.description}</p>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Projects</h2>
            <Button onClick={() => router.push(`/spaces/${numericSpaceId}/projects/create`)}>
              Create Project
            </Button>
          </div>
          <ProjectList
            spaceId={numericSpaceId}
            projects={projects}
            onProjectDelete={handleProjectDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
} 