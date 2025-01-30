"use client"
import { useState } from 'react';
import { Task } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { StorageService } from '@/services/storage';
import { Slider } from "@/components/ui/slider"; // ShadCN UI Slider 사용

interface ProgressNote {
  id: number;
  taskId: number;
  note: string;
  timestamp: string;
  progressPercentage: number;
}

interface TaskProgressProps {
  task: Task;
  onProgressUpdate: (taskId: number, progress: number) => void;
}

export default function TaskProgress({ task, onProgressUpdate }: TaskProgressProps) {
  const [progressNotes, setProgressNotes] = useState<ProgressNote[]>(() => 
    StorageService.getProgressNotes(task.id)
  );
  const [newNote, setNewNote] = useState('');
  const [progressPercentage, setProgressPercentage] = useState(0);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newProgressNote: ProgressNote = {
      id: Date.now(),
      taskId: task.id,
      note: newNote,
      timestamp: new Date().toISOString(),
      progressPercentage: progressPercentage
    };

    const updatedNotes = [...progressNotes, newProgressNote];
    setProgressNotes(updatedNotes);
    StorageService.saveProgressNotes(task.id, updatedNotes);
    onProgressUpdate(task.id, progressPercentage);
    setNewNote('');
  };

  return (
    <div className="mt-6 space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">진행 상황</h3>
        <Progress value={progressPercentage} className="w-full" />
        <Slider
  defaultValue={[progressPercentage]}
  max={100}
  step={1}
  onValueChange={(value) => setProgressPercentage(value[0])}
  className="w-full mt-2"
/>
        <span className="text-sm text-gray-600">{progressPercentage}% 완료</span>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">진행 노트</h3>
        <div className="space-y-2">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="진행 상황에 대한 노트를 작성하세요"
            className="min-h-[100px]"
          />
          <Button onClick={handleAddNote}>노트 추가</Button>
        </div>

        <div className="mt-4 space-y-4">
          {progressNotes.map((note) => (
            <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-600">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
                <span className="text-sm font-medium">
                  진행률: {note.progressPercentage}%
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{note.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 