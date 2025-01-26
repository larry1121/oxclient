"use client"
import { useState, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Task {
  id: number;
  assignee: string;
  in_project_id: number;
  in_project_name: string;
  status: string;
  priority: string;
  task_due_date: string;
  ox_due_date: string;
  task_title: string;
  project_overview: string;
  description: string;
  detail_tasks: string[];
  expected_outcome: string;
  metric: string;
  space: string;
  category: string;
}

interface TaskFormProps {
  onTaskAdd?: (task: Task) => void;
}

export default function TaskForm({ onTaskAdd }: TaskFormProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('Wire Frame Mock Up');
  const [projectOverview, setProjectOverview] = useState('프로젝트 개요 (옵션)');
  const [description, setDescription] = useState('시드 라운드 투자를 위해 개발 와이어프레임을 미루고...');
  const [detailTasks, setDetailTasks] = useState<string[]>(['']);
  const [expectedOutcome, setExpectedOutcome] = useState('와이어 프레임 50p 피그마');
  const [metric, setMetric] = useState('텍스트로 전환을 00% 넘겨라~');
  const [space, setSpace] = useState('00');
  const [category, setCategory] = useState('design');
  const [assignee, setAssignee] = useState('dongho');
  const [status, setStatus] = useState('InProgress');
  const [priority, setPriority] = useState('high');
  const [completionDate, setCompletionDate] = useState('2025-01-17');
  const [dueDate, setDueDate] = useState('2025-01-10');
  const [successMessage, setSuccessMessage] = useState('');

  // 날짜 초기값 설정 (현재 시간 기준)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [taskDueDate, setTaskDueDate] = useState(today.toISOString().split('T')[0]);
  const [oxDueDate, setOxDueDate] = useState(tomorrow.toISOString().split('T')[0]);

  const validateForm = (): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDateTime = new Date(taskDueDate);
    const oxDateTime = new Date(oxDueDate);

    if (!taskDueDate || !oxDueDate) {
      alert("Task 마감일과 OX 검토 마감일을 모두 입력해주세요");
      return false;
    }
    if (taskDateTime < today) {
      alert("Task 마감일은 오늘 이후로 설정해주세요");
      return false;
    }
    if (oxDateTime < today) {
      alert("OX 검토 마감일은 오늘 이후로 설정해주세요");
      return false;
    }
    if (taskDateTime > oxDateTime) {
      alert("Task 마감일은 OX 검토 마감일 이전이어야 합니다");
      return false;
    }
    return true;
  };

  const addTask = (newTask: Task) => {
    onTaskAdd?.(newTask);
    setSuccessMessage("Task successfully created!");
    
    // 폼 초기화
    setTaskTitle('');
    setProjectOverview('');
    setDescription('');
    setDetailTasks(['']);
    setExpectedOutcome('');
    setMetric('');
    setSpace('00');
    setCategory('design');
    setAssignee('dongho');
    setStatus('InProgress');
    setPriority('high');
    setCompletionDate('');
    setDueDate('');
    
    // 3초 후 성공 메시지 제거
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Task Creation</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <label htmlFor="taskTitle">Task Title <span className="text-red-500">*</span></label>
      <Input
        id="taskTitle"
        value={taskTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />

      <label htmlFor="projectOverview">Project Overview</label>
      <Input
        id="projectOverview"
        value={projectOverview}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectOverview(e.target.value)}
        placeholder="Enter project overview"
      />

      <div className="mt-4 space-y-2">
        <span className="block font-medium">속성값 설정</span>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label htmlFor="space" className="block">스페이스</label>
            <Select value={space} onValueChange={setSpace}>
              <SelectTrigger id="space">
                <SelectValue placeholder="00" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="00">00</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="category" className="block">카테고리</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="디자인" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">디자인</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="assignee" className="block">참여자</label>
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger id="assignee">
                <SelectValue placeholder="신다혜" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dongho">동호</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="status" className="block">스테이터스</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="진행전" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NotStarted">진행전</SelectItem>
                <SelectItem value="InProgress">진행중</SelectItem>
                <SelectItem value="Completed">완료</SelectItem>
                <SelectItem value="OnHold">보류</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="priority" className="block">우선순위</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="우선순위 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">높음</SelectItem>
                <SelectItem value="medium">중간</SelectItem>
                <SelectItem value="low">낮음</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <label htmlFor="description">상세 설명 <span className="text-red-500">*</span></label>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="상세 설명을 입력하세요"
        className="mt-4"
      />

      <div className="space-y-2">
        <label htmlFor="detailTasks">상세 테스크</label>
        {detailTasks.map((task, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={task}
              onChange={(e) => {
                const newTasks = [...detailTasks];
                newTasks[index] = e.target.value;
                setDetailTasks(newTasks);
              }}
              placeholder={`상세 테스크 ${index + 1}`}
            />
            {detailTasks.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  setDetailTasks(detailTasks.filter((_, i) => i !== index));
                }}
              >
                삭제
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => setDetailTasks([...detailTasks, ''])}
        >
          상세 테스크 추가
        </Button>
      </div>

      <label htmlFor="expectedOutcome">기대 결과</label>
      <Textarea
        id="expectedOutcome"
        value={expectedOutcome}
        onChange={(e) => setExpectedOutcome(e.target.value)}
        placeholder="기대 결과를 입력하세요"
        className="mt-4"
      />

      <label htmlFor="metric">지표 설정</label>
      <Textarea
        id="metric"
        value={metric}
        onChange={(e) => setMetric(e.target.value)}
        placeholder="지표를 입력하세요"
        className="mt-4"
      />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="taskDueDate" className="block">Task 마감일</label>
          <Input
            id="taskDueDate"
            type="date"
            value={taskDueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="oxDueDate" className="block">OX 검토 마감일</label>
          <Input
            id="oxDueDate"
            type="date"
            value={oxDueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setOxDueDate(e.target.value)}
          />
        </div>
      </div>

      <Button
        className="mt-4"
        onClick={() => {
          if (validateForm()) {
            const newTask: Task = {
              id: tasks.length + 1,
              task_title: taskTitle,
              project_overview: projectOverview,
              description,
              detail_tasks: detailTasks,
              expected_outcome: expectedOutcome,
              metric,
              space,
              category,
              assignee,
              status,
              priority,
              task_due_date: taskDueDate,
              ox_due_date: oxDueDate,
              in_project_id: 0,
              in_project_name: "",
            };
            addTask(newTask);
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
}
