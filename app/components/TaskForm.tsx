import { useState, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export default function TaskForm() {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [metric, setMetric] = useState('');

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Task Creation</h2>
      <Input
        label="프로젝트 개요 (옵션)"
        value={taskTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
        placeholder="프로젝트 개요를 입력하세요"
      />
      <div className="mt-4">
        <span>속성값 설정</span>
        <div>스페이스 00 카테고리 디자인 참여자 신다혜 스테이터스 진행전 완료 날짜 25.01.17 OX 마감 날짜 25.01.10</div>
      </div>
      <Textarea
        label="상세 설명"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        placeholder="상세 설명을 입력하세요"
        className="mt-4"
      />
      <Textarea
        label="상세 테스크"
        value={expectedOutcome}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setExpectedOutcome(e.target.value)}
        placeholder="상세 테스크를 입력하세요"
        className="mt-4"
      />
      <Textarea
        label="기대 결과"
        value={expectedOutcome}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setExpectedOutcome(e.target.value)}
        placeholder="기대 결과를 입력하세요"
        className="mt-4"
      />
      <Select
        label="지표 설정"
        value={metric}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setMetric(e.target.value)}
        className="mt-4"
      >
        <option value="">지표를 선택하세요</option>
        <option value="completion">Completion Rate</option>
        <option value="quality">Quality Score</option>
      </Select>
      <Button className="mt-4" onClick={() => console.log('Task Submitted')}>
        Submit
      </Button>
    </div>
  );
} 