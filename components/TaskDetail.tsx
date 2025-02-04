"use client"
import { useState } from 'react';
import { Task, SubTask, TaskSubmissionData } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import TaskProgress from './TaskProgress';
import SubTaskList from './SubTaskList';
import TaskSubmission from './TaskSubmission';
import TaskEvaluation from './TaskEvaluation';

interface TaskDetailProps {
  task: Task | null;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

export default function TaskDetail({ task, onClose, onUpdate }: TaskDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(task);

  if (!task || !editedTask) return null;

  const handleUpdate = () => {
    if (editedTask) {
      onUpdate(editedTask);
      setIsEditing(false);
    }
  };

  const handleProgressUpdate = (taskId: number, progress: number) => {
    if (editedTask) {
      const updatedTask = {
        ...editedTask,
        progress: progress
      };
      setEditedTask(updatedTask);
      onUpdate(updatedTask);
    }
  };

  const handleAddSubTask = (newSubTask: SubTask) => {
    if (editedTask) {
      const updatedTask = {
        ...editedTask,
        subTasks: [...(editedTask.subTasks || []), newSubTask]
      };
      setEditedTask(updatedTask);
      onUpdate(updatedTask);
    }
  };

  const handleUpdateSubTask = (updatedSubTask: SubTask) => {
    if (editedTask) {
      const updatedTask = {
        ...editedTask,
        subTasks: (editedTask.subTasks || []).map(st => 
          st.id === updatedSubTask.id ? updatedSubTask : st
        )
      };
      setEditedTask(updatedTask);
      onUpdate(updatedTask);
    }
  };

  const handleTaskSubmit = (taskId: number, submissionData: TaskSubmissionData) => {
    const updatedTask = {
      ...task,
      evaluation: {
        isSubmitted: true,
        submittedAt: new Date().toISOString(),
        submissionData: submissionData,
        history: task.evaluation?.history || []
      },
      status: 'Submitted'
    };
    
    onUpdate(updatedTask);
  };

  const handleEvaluate = (taskId: number, evaluation: { score: 'O' | 'X', feedback: string }) => {
    const currentEvaluation = task.evaluation;
    const history = currentEvaluation?.history ? [...currentEvaluation.history] : [];

    history.push({
      submittedAt: currentEvaluation?.submittedAt || new Date().toISOString(),
      evaluatedAt: new Date().toISOString(),
      submissionData: currentEvaluation?.submissionData || {
        resultReport: '',
        executionResult: '',
        attachments: []
      },
      score: evaluation.score,
      feedback: evaluation.feedback,
      evaluator: '평가자 A'
    });

    const updatedTask = {
      ...task,
      status: evaluation.score === 'X' ? 'InProgress' : 'Completed',
      evaluation: {
        isSubmitted: evaluation.score === 'X' ? false : true,
        submittedAt: evaluation.score === 'X' ? undefined : task.evaluation?.submittedAt,
        evaluatedAt: new Date().toISOString(),
        score: evaluation.score,
        feedback: evaluation.feedback,
        evaluator: '평가자 A',
        history: history,
        submissionData: task.evaluation?.submissionData
      }
    };

    onUpdate(updatedTask);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          {isEditing ? (
            <Input
              value={editedTask.task_title}
              onChange={(e) => setEditedTask({ ...editedTask, task_title: e.target.value })}
              className="text-xl font-bold"
            />
          ) : (
            <h2 className="text-xl font-bold">{task.task_title}</h2>
          )}
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              수정
            </Button>
          )}
          {isEditing && (
            <>
              <Button variant="default" onClick={handleUpdate}>
                저장
              </Button>
              <Button variant="outline" onClick={() => {
                setEditedTask(task);
                setIsEditing(false);
              }}>
                취소
              </Button>
            </>
          )}
          <Button variant="ghost" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <Select
                value={editedTask.status}
                onValueChange={(value) => setEditedTask({ ...editedTask, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NotStarted">진행전</SelectItem>
                  <SelectItem value="InProgress">진행중</SelectItem>
                  <SelectItem value="Completed">완료</SelectItem>
                  <SelectItem value="OnHold">보류</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={editedTask.priority}
                onValueChange={(value) => setEditedTask({ ...editedTask, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">높음</SelectItem>
                  <SelectItem value="medium">중간</SelectItem>
                  <SelectItem value="low">낮음</SelectItem>
                </SelectContent>
              </Select>
            </>
          ) : (
            <>
              <Badge className={getStatusColor(task.status)}>
                {task.status === 'NotStarted' ? '진행전' :
                 task.status === 'InProgress' ? '진행중' :
                 task.status === 'Completed' ? '완료' : '보류'}
              </Badge>
              <Badge className={getPriorityColor(task.priority as 'high' | 'medium' | 'low')}>
                {task.priority === 'high' ? '높음' :
                 task.priority === 'medium' ? '중간' : '낮음'}
              </Badge>
            </>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2">프로젝트 개요</h3>
          {isEditing ? (
            <Textarea
              value={editedTask.project_overview}
              onChange={(e) => setEditedTask({ ...editedTask, project_overview: e.target.value })}
            />
          ) : (
            <p className="text-gray-600">{task.project_overview}</p>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2">상세 설명</h3>
          {isEditing ? (
            <Textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
          ) : (
            <p className="text-gray-600">{task.description}</p>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2">상세 테스크</h3>
          {isEditing ? (
            <div className="space-y-2">
              {editedTask.detail_tasks.map((detailTask, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={detailTask}
                    onChange={(e) => {
                      const newDetailTasks = [...editedTask.detail_tasks];
                      newDetailTasks[index] = e.target.value;
                      setEditedTask({ ...editedTask, detail_tasks: newDetailTasks });
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => {
                      const newDetailTasks = editedTask.detail_tasks.filter((_, i) => i !== index);
                      setEditedTask({ ...editedTask, detail_tasks: newDetailTasks });
                    }}
                  >
                    삭제
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setEditedTask({
                    ...editedTask,
                    detail_tasks: [...editedTask.detail_tasks, '']
                  });
                }}
              >
                상세 테스크 추가
              </Button>
            </div>
          ) : (
            <ul className="list-disc list-inside text-gray-600">
              {task.detail_tasks.map((detailTask, index) => (
                <li key={index}>{detailTask}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">완료 날짜</h3>
            {isEditing ? (
              <Input
                type="date"
                value={editedTask.task_due_date}
                onChange={(e) => setEditedTask({ ...editedTask, task_due_date: e.target.value })}
              />
            ) : (
              <p className="text-gray-600">
                {new Date(task.task_due_date).toLocaleDateString()}
              </p>
            )}
          </div>
          <div>
            <h3 className="font-medium mb-2">마감 날짜</h3>
            {isEditing ? (
              <Input
                type="date"
                value={editedTask.ox_due_date}
                onChange={(e) => setEditedTask({ ...editedTask, ox_due_date: e.target.value })}
              />
            ) : (
              <p className="text-gray-600">
                {new Date(task.ox_due_date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <TaskProgress 
        task={task} 
        onProgressUpdate={handleProgressUpdate}
      />

      <SubTaskList
        parentTask={task}
        onSubTaskAdd={handleAddSubTask}
        onSubTaskUpdate={handleUpdateSubTask}
      />

      <div className="mt-8">
        {task.evaluation?.history && task.evaluation.history.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">평가 이력</h3>
            <div className="space-y-4">
              {task.evaluation.history.map((hist, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {hist.score === 'O' ? '✅ 승인' : '❌ 반려'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(hist.evaluatedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <h4 className="font-medium">제출 내용</h4>
                    <p className="mt-1">결과 보고: {hist.submissionData.resultReport}</p>
                    <p className="mt-1">실행 결과: {hist.submissionData.executionResult}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium text-sm">피드백</h4>
                    <p className="text-gray-700">{hist.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!task.evaluation?.isSubmitted || task.status === 'InProgress') ? (
          <TaskSubmission 
            task={task} 
            onSubmit={handleTaskSubmit}
            previousSubmission={task.evaluation?.submissionData}
          />
        ) : !task.evaluation.evaluatedAt ? (
          <TaskEvaluation task={task} onEvaluate={handleEvaluate} />
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">최종 평가 결과</h3>
            <p className="text-xl font-bold mb-2">
              {task.evaluation.score === 'O' ? '✅ 승인' : '❌ 반려'}
            </p>
            <p className="text-gray-700">{task.evaluation.feedback}</p>
            <p className="text-sm text-gray-500 mt-2">
              평가일: {new Date(task.evaluation.evaluatedAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

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