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
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            검색어
          </label>
          <Input
            id="search"
            type="text"
            placeholder="제목 또는 설명으로 검색"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            상태
          </label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="NotStarted">진행전</SelectItem>
              <SelectItem value="InProgress">진행중</SelectItem>
              <SelectItem value="OnHold">보류</SelectItem>
              <SelectItem value="Completed">완료</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="priority" className="text-sm font-medium text-gray-700">
            우선순위
          </label>
          <Select
            value={filters.priority}
            onValueChange={(value) => handleFilterChange('priority', value)}
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="우선순위 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="high">높음</SelectItem>
              <SelectItem value="medium">중간</SelectItem>
              <SelectItem value="low">낮음</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="assignee" className="text-sm font-medium text-gray-700">
            담당자
          </label>
          <Select
            value={filters.assignee}
            onValueChange={(value) => handleFilterChange('assignee', value)}
          >
            <SelectTrigger id="assignee">
              <SelectValue placeholder="담당자 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="dongho">동호</SelectItem>
              {/* Add more team members */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
            정렬 기준
          </label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleFilterChange('sortBy', value)}
          >
            <SelectTrigger id="sortBy">
              <SelectValue placeholder="정렬 기준 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">마감일순</SelectItem>
              <SelectItem value="priority">우선순위순</SelectItem>
              <SelectItem value="status">상태순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
} 