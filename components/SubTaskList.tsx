"use client"
import { useState } from 'react';
import { SubTask, Task } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SubTaskListProps {
  parentTask: Task;
  onSubTaskAdd: (newSubTask: SubTask) => void;
  onSubTaskUpdate: (updatedSubTask: SubTask) => void;
}

export default function SubTaskList({ parentTask, onSubTaskAdd, onSubTaskUpdate }: SubTaskListProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSubTask, setNewSubTask] = useState<Partial<SubTask>>({
    title: '',
    assignee: '',
    priority: 'medium',
    status: 'NotStarted',
    dueDate: ''
  });

  const handleAddSubTask = () => {
    if (!newSubTask.title || !newSubTask.dueDate) {
      alert('제목과 마감일은 필수입니다.');
      return;
    }

    const subTask: SubTask = {
      id: Date.now(),
      parentTaskId: parentTask.id,
      title: newSubTask.title,
      assignee: newSubTask.assignee || '',
      priority: newSubTask.priority || 'medium',
      status: newSubTask.status || 'NotStarted',
      dueDate: newSubTask.dueDate,
      description: newSubTask.description
    };

    onSubTaskAdd(subTask);
    setIsAddingNew(false);
    setNewSubTask({
      title: '',
      assignee: '',
      priority: 'medium',
      status: 'NotStarted',
      dueDate: ''
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">하위 테스크</h3>
        <Button 
          variant="outline" 
          onClick={() => setIsAddingNew(true)}
          disabled={isAddingNew}
        >
          하위 테스크 추가
        </Button>
      </div>

      {isAddingNew && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-4">
            <Input
              placeholder="하위 테스크 제목"
              value={newSubTask.title}
              onChange={(e) => setNewSubTask({ ...newSubTask, title: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={newSubTask.assignee}
                onValueChange={(value) => setNewSubTask({ ...newSubTask, assignee: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="담당자 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dongho">동호</SelectItem>
                  {/* Add more team members */}
                </SelectContent>
              </Select>
              <Select
                value={newSubTask.priority}
                onValueChange={(value) => setNewSubTask({ ...newSubTask, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="우선순위" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">높음</SelectItem>
                  <SelectItem value="medium">중간</SelectItem>
                  <SelectItem value="low">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="date"
              value={newSubTask.dueDate}
              onChange={(e) => setNewSubTask({ ...newSubTask, dueDate: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddSubTask}>추가</Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                취소
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {parentTask.subTasks?.map((subTask) => (
          <div key={subTask.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{subTask.title}</h4>
                <p className="text-sm text-gray-600">담당자: {subTask.assignee}</p>
              </div>
              <div className="flex gap-2">
                <Badge>{subTask.priority}</Badge>
                <Badge>{subTask.status}</Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              마감일: {new Date(subTask.dueDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 