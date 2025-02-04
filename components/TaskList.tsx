"use client"
import { useState, useMemo, useEffect } from 'react';

import { Task } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TaskFilter, { TaskFilters } from './TaskFilter';

interface TaskListProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
}

export default function TaskList({ tasks, onTaskSelect, onTaskDelete }: TaskListProps) {
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: 'all',
    priority: 'all',
    assignee: 'all',
    sortBy: 'dueDate'
  });

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.task_title.toLowerCase().includes(filters.search.toLowerCase()) ||
                            task.description.toLowerCase().includes(filters.search.toLowerCase());
        const matchesStatus = filters.status === 'all' || task.status === filters.status;
        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
        const matchesAssignee = filters.assignee === 'all' || task.assignee === filters.assignee;
        
        return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'dueDate':
            return new Date(a.ox_due_date).getTime() - new Date(b.ox_due_date).getTime();
          case 'priority':
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority as keyof typeof priorityOrder] - 
                   priorityOrder[b.priority as keyof typeof priorityOrder];
          case 'status':
            const statusOrder = { NotStarted: 0, InProgress: 1, OnHold: 2, Completed: 3 };
            return statusOrder[a.status as keyof typeof statusOrder] - 
                   statusOrder[b.status as keyof typeof statusOrder];
          default:
            return 0;
        }
      });
  }, [tasks, filters]);

  useEffect(() => {
    const taskIds = tasks.map(task => task.id);
    const uniqueTaskIds = new Set(taskIds);
    if (uniqueTaskIds.size !== taskIds.length) {
      console.error("중복된 task ID가 있습니다:", tasks.filter((task, index) => taskIds.indexOf(task.id) !== index));
    }
  }, [tasks]);

  const getStatusColor = (status: string) => {
    const colors = {
      NotStarted: 'bg-gray-500',
      InProgress: 'bg-blue-500',
      Completed: 'bg-green-500',
      OnHold: 'bg-yellow-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority] || 'bg-gray-500';
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Task List</h2>
      <TaskFilter onFilterChange={setFilters} />
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => onTaskSelect(task)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold">{task.task_title}</h3>
                <div className="flex gap-2">
                  <Badge className={`${getStatusColor(task.status)}`}>
                    {task.status === 'NotStarted' ? '진행전' :
                     task.status === 'InProgress' ? '진행중' :
                     task.status === 'Completed' ? '완료' : '보류'}
                  </Badge>
                  <Badge className={`${getPriorityColor(task.priority as 'high' | 'medium' | 'low')}`}>
                    {task.priority === 'high' ? '높음' :
                     task.priority === 'medium' ? '중간' : '낮음'}
                  </Badge>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onTaskDelete(task.id);
                }}
                className="ml-2"
              >
                삭제
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">
              <p>담당자: {task.assignee}</p>
              <p>마감일: {new Date(task.ox_due_date).toLocaleDateString()}</p>
            </div>
            
            <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
            
            {task.detail_tasks.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">상세 테스크:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {task.detail_tasks.map((detailTask, index) => (
                    <li key={index} className="line-clamp-1">{detailTask}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 