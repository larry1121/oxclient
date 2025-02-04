"use client"
import { useRouter } from 'next/navigation';
import SpaceForm from '@/components/SpaceForm';
import { Space } from '@/types/space';
import { StorageService } from '@/services/storage';

export default function CreateSpacePage() {
  const router = useRouter();

  const handleAddSpace = (newSpace: Space) => {
    const spaces = StorageService.getSpaces();
    const updatedSpaces = [...spaces, newSpace];
    StorageService.saveSpaces(updatedSpaces);
    router.push('/spaces');
  };

  return (
    <div className="container mx-auto py-8">
      <SpaceForm onSpaceAdd={handleAddSpace} />
    </div>
  );
} 