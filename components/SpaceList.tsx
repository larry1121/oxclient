"use client"
import { Space } from '@/types/space';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface SpaceListProps {
  spaces: Space[];
  onSpaceDelete?: (spaceId: number) => void;
}

export default function SpaceList({ spaces, onSpaceDelete }: SpaceListProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {spaces.map((space) => (
        <div
          key={space.id}
          className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => router.push(`/spaces/${space.id}`)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{space.name}</h3>
              <p className="text-sm text-gray-600">{space.description}</p>
            </div>
            {onSpaceDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSpaceDelete(space.id);
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