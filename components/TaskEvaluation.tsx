"use client"
import { useState } from 'react';
import { Task } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TaskEvaluationProps {
  task: Task;
  onSubmit: (taskId: number) => void;
  onEvaluate: (taskId: number, evaluation: { score: 'O' | 'X', feedback: string }) => void;
}

export default function TaskEvaluation({ task, onSubmit, onEvaluate }: TaskEvaluationProps) {
  // ... 컴포넌트 구현
} 