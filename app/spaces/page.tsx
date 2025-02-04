"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Space } from '@/types/space';
import SpaceList from '@/components/SpaceList';
import { Button } from '@/components/ui/button';
import { StorageService } from '@/services/storage';

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedSpaces = StorageService.getSpaces();
    setSpaces(savedSpaces);
  }, []);

  const handleSpaceDelete = (spaceId: number) => {
    if (window.confirm('이 스페이스를 삭제하시겠습니까?')) {
      const updatedSpaces = spaces.filter(space => space.id !== spaceId);
      setSpaces(updatedSpaces);
      StorageService.saveSpaces(updatedSpaces);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Spaces</h1>
        <Button onClick={() => router.push('/spaces/create')}>
          Create Space
        </Button>
      </div>
      <SpaceList 
        spaces={spaces}
        onSpaceDelete={handleSpaceDelete}
      />
    </div>
  );
} 