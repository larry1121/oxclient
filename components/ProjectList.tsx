"use client"
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProjectListProps {
  spaceId: number;
  projects: Project[];
  onProjectDelete?: (projectId: number) => void;
}

export default function ProjectList({ spaceId, projects, onProjectDelete }: ProjectListProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => router.push(`/spaces/${spaceId}/projects/${project.id}`)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
            {onProjectDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectDelete(project.id);
                }}
              >
                삭제
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 