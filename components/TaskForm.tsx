"use client"
import { useState, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function TaskForm() {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [metric, setMetric] = useState('');
  const [space, setSpace] = useState('00');
  const [category, setCategory] = useState('design');
  const [assignee, setAssignee] = useState('sindahye');
  const [status, setStatus] = useState('not_started');
  const [completionDate, setCompletionDate] = useState('2025-01-17');
  const [dueDate, setDueDate] = useState('2025-01-10');

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Task Creation</h2>
      <label htmlFor="taskTitle">프로젝트 개요 (옵션)</label>
      <Input
        id="taskTitle"
        value={taskTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
        placeholder="프로젝트 개요를 입력하세요"
      />
      <label htmlFor="description">상세 설명</label>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="상세 설명을 입력하세요"
        className="mt-2"
      />
      <label htmlFor="tasks" className="mt-4 block">상세 테스크</label>
      <Textarea
        id="tasks"
        value={expectedOutcome}
        onChange={(e) => setExpectedOutcome(e.target.value)}
        placeholder="상세 테스크를 입력하세요"
        className="mt-2"
      />
      <label htmlFor="expectedOutcome" className="mt-4 block">기대 결과</label>
      <Textarea
        id="expectedOutcome"
        value={expectedOutcome}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setExpectedOutcome(e.target.value)}
        placeholder="기대 결과를 입력하세요"
        className="mt-2"
      />
      <label htmlFor="metric" className="mt-4 block">지표 설정</label>
      <Select
        value={metric}
        onValueChange={setMetric}
      >
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="지표를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="completion">Completion Rate</SelectItem>
          <SelectItem value="quality">Quality Score</SelectItem>
        </SelectContent>
      </Select>
      <div className="mt-4 space-y-2">
        <span className="block font-medium">속성값 설정</span>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label htmlFor="space" className="block">스페이스</label>
            <Select value="" onValueChange={() => {}}>
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
            <Select value="" onValueChange={() => {}}>
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
            <Select value="" onValueChange={() => {}}>
              <SelectTrigger id="assignee">
                <SelectValue placeholder="신다혜" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sindahye">신다혜</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="status" className="block">스테이터스</label>
            <Select value="" onValueChange={() => {}}>
              <SelectTrigger id="status">
                <SelectValue placeholder="진행전" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">진행전</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="completionDate" className="block">완료 날짜</label>
          <Input
            id="completionDate"
            type="date"
            defaultValue="2025-01-17"
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block">마감 날짜</label>
          <Input
            id="dueDate"
            type="date"
            defaultValue="2025-01-10"
          />
        </div>
      </div>
      <Button className="mt-4" onClick={() => console.log('Task Submitted')}>
        Submit
      </Button>
    </div>
  );
} 