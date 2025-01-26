"use client"
import { useState } from 'react';
import { Task,TaskSubmissionData } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StorageService } from '@/services/storage';

interface TaskSubmissionProps {
  task: Task;
  onSubmit: (taskId: number, submissionData: TaskSubmissionData) => void;
  previousSubmission?: TaskSubmissionData;
}

export default function TaskSubmission({ task, onSubmit, previousSubmission }: TaskSubmissionProps) {
  const [submissionData, setSubmissionData] = useState<TaskSubmissionData>(
    previousSubmission || {
      resultReport: '',
      executionResult: '',
      attachments: []
    }
  );
  
  const handleSubmit = () => {
    if (!submissionData.resultReport.trim() || !submissionData.executionResult.trim()) {
      alert('결과 보고와 실행 결과는 필수 입력사항입니다.');
      return;
    }
    
    onSubmit(task.id, submissionData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">결과 보고</h3>
        <Textarea
          value={submissionData.resultReport}
          onChange={(e) => setSubmissionData({
            ...submissionData,
            resultReport: e.target.value
          })}
          placeholder="테스크 수행 결과에 대한 상세 보고를 작성하세요"
          className="min-h-[200px]"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">실행 결과</h3>
        <Textarea
          value={submissionData.executionResult}
          onChange={(e) => setSubmissionData({
            ...submissionData,
            executionResult: e.target.value
          })}
          placeholder="실제 실행 결과 및 성과를 작성하세요"
          className="min-h-[150px]"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">첨부 파일</h3>
        <div className="space-y-2">
          <Input
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              const fileUrls = files.map(file => URL.createObjectURL(file));
              setSubmissionData({
                ...submissionData,
                attachments: [...submissionData.attachments, ...fileUrls]
              });
            }}
          />
          <div className="grid grid-cols-2 gap-2">
            {submissionData.attachments.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm text-gray-600">첨부파일 {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSubmissionData({
                      ...submissionData,
                      attachments: submissionData.attachments.filter((_, i) => i !== index)
                    });
                  }}
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">임시 저장</Button>
        <Button onClick={handleSubmit}>제출</Button>
      </div>
    </div>
  );
} 