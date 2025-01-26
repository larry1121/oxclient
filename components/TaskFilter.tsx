"use client"
import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TaskFilterProps {
  onFilterChange: (filters: TaskFilters) => void;
}

export interface TaskFilters {
  search: string;
  status: string;
  priority: string;
  assignee: string;
  sortBy: string;
}

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: 'all',
    priority: 'all',
    assignee: 'all',
    sortBy: 'dueDate'
  });

  const handleFilterChange = (key: keyof TaskFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg mb-4">
      <div className="flex gap-4">
        <Input
          placeholder="테스크 검색..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="flex-1"
        />
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleFilterChange('sortBy', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">마감일순</SelectItem>
            <SelectItem value="priority">우선순위순</SelectItem>
            <SelectItem value="status">상태순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="NotStarted">진행전</SelectItem>
            <SelectItem value="InProgress">진행중</SelectItem>
            <SelectItem value="Completed">완료</SelectItem>
            <SelectItem value="OnHold">보류</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.priority}
          onValueChange={(value) => handleFilterChange('priority', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="우선순위 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="high">높음</SelectItem>
            <SelectItem value="medium">중간</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.assignee}
          onValueChange={(value) => handleFilterChange('assignee', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="담당자 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="dongho">동호</SelectItem>
            {/* Add more team members */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 