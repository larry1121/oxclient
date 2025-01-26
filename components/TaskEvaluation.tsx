"use client"
import { useState } from 'react';
import { Task } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TaskEvaluationProps {
  task: Task;
  onEvaluate: (taskId: number, evaluation: { score: 'O' | 'X', feedback: string }) => void;
}

export default function TaskEvaluation({ task, onEvaluate }: TaskEvaluationProps) {
  const [evaluation, setEvaluation] = useState({
    score: '' as 'O' | 'X' | '',
    feedback: ''
  });

  if (!task.evaluation?.isSubmitted) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">이 테스크는 아직 제출되지 않았습니다.</p>
      </div>
    );
  }

  const handleEvaluate = () => {
    if (!evaluation.score) {
      alert('평가 결과(O/X)를 선택해주세요.');
      return;
    }

    if (evaluation.score === 'X' && !evaluation.feedback.trim()) {
      alert('X 평가 시에는 피드백이 필수입니다.');
      return;
    }

    onEvaluate(task.id, {
      score: evaluation.score,
      feedback: evaluation.feedback
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">제출된 결과</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">결과 보고</h4>
            <p className="text-gray-700 whitespace-pre-wrap">
              {task.evaluation.submissionData?.resultReport}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">실행 결과</h4>
            <p className="text-gray-700 whitespace-pre-wrap">
              {task.evaluation.submissionData?.executionResult}
            </p>
          </div>
          {(task.evaluation.submissionData?.attachments || []).length > 0 && (
            <div>
              <h4 className="font-medium mb-2">첨부 파일</h4>
              <div className="grid grid-cols-2 gap-2">
                {(task.evaluation.submissionData?.attachments || []).map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    첨부파일 {index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">평가</h3>
          <RadioGroup
            value={evaluation.score}
            onValueChange={(value) => setEvaluation({ ...evaluation, score: value as 'O' | 'X' })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="O" id="score-o" />
              <Label htmlFor="score-o">O</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="X" id="score-x" />
              <Label htmlFor="score-x">X</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">피드백</h3>
          <Textarea
            value={evaluation.feedback}
            onChange={(e) => setEvaluation({ ...evaluation, feedback: e.target.value })}
            placeholder={evaluation.score === 'X' ? '수정이 필요한 사항을 작성해주세요 (필수)' : '추가 피드백을 작성해주세요 (선택)'}
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={handleEvaluate}>평가 완료</Button>
        </div>
      </div>
    </div>
  );
} 