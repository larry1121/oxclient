"use client"
import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/ProjectForm';
import { Project } from '@/types/project';
import { StorageService } from '@/services/storage';

export default function CreateProjectPage({ params }: { params: { spaceId: string } }) {
  const router = useRouter();
  const spaceId = parseInt(params.spaceId);

  const handleAddProject = (newProject: Project) => {
    const projects = StorageService.getProjects(spaceId);
    const updatedProjects = [...projects, newProject];
    StorageService.saveProjects(spaceId, updatedProjects);
    router.push(`/spaces/${spaceId}/projects`);
  };

  return (
    <div className="container mx-auto py-8">
      <ProjectForm spaceId={spaceId} onProjectAdd={handleAddProject} />
    </div>
  );
} 