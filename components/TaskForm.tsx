"use client"

import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// shadcn/ui
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

//
// 1) Task 인터페이스
//
interface Task {
  id: number
  assignee: string
  in_project_id: number
  in_project_name: string
  status: string
  priority: string
  task_due_date: string
  ox_due_date: string
  task_title: string
  project_overview: string
  description: string
  detail_tasks: string[] 
  expected_outcome: string
  metric: string
  space: string
  category: string
}

interface TaskFormProps {
  onTaskAdd?: (task: Task) => void
}

//
// 2) Zod 스키마 정의
//    - 필요한 부분에 따라 더 세세한 validation 규칙을 추가할 수 있습니다.
//
const today = new Date();
today.setUTCHours(0, 0, 0, 0); // UTC 기준으로 00:00:00 설정

const tomorrow = new Date(today);
tomorrow.setUTCDate(today.getUTCDate() + 1);

console.log(today, tomorrow);


// *주의: Date 입력을 문자열로 받고 있으므로, 아래에서도 string으로 받되 date 변환을 직접 수행합니다.
const taskFormSchema = z
  .object({
    task_title: z.string().min(1, "Task Title은 필수입니다."),
    project_overview: z.string().default(""),
    description: z.string().min(1, "상세 설명은 필수입니다."),
    detail_tasks: z.array(z.object({ task: z.string() })).default([]),
    expected_outcome: z.string().default("기대 결과를 입력하세요"),
    metric: z.string().nonempty(),
    space: z.string().default("00"),
    category: z.string().default("design"),
    assignee: z.string().default("dongho"),
    status: z.string().default("InProgress"),
    priority: z.string().default("high"),
    task_due_date: z.string(),
    ox_due_date: z.string(),
  })
  // 3) refine을 통해 날짜 관련 로직 처리
  .refine(
    (data) => {
      const taskDate = new Date(data.task_due_date)
      return taskDate >= today
    },
    {
      path: ["task_due_date"],
      message: "Task 마감일은 오늘 이후여야 합니다.",
    }
  )
  .refine(
    (data) => {
      const oxDate = new Date(data.ox_due_date)
      return oxDate >= today
    },
    {
      path: ["ox_due_date"],
      message: "OX 검토 마감일은 오늘 이후여야 합니다.",
    }
  )
  .refine(
    (data) => {
      const taskDate = new Date(data.task_due_date)
      const oxDate = new Date(data.ox_due_date)
      return taskDate <= oxDate
    },
    {
      path: ["task_due_date"],
      message: "Task 마감일은 OX 검토 마감일 이전이어야 합니다.",
    }
  )

//
// 4) 폼 컴포넌트
//
export default function TaskForm({ onTaskAdd }: TaskFormProps) {
  const [successMessage, setSuccessMessage] = useState("")

  // 4-1) useForm 훅으로 리액트 훅 폼 제어
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      task_title: "Wire Frame Mock Up",
      project_overview: "프로젝트 개요 (옵션)",
      description: "시드 라운드 투자를 위해...",
      detail_tasks: [{ task: "상세테스크 1" }],
      expected_outcome: "와이어 프레임 50p 피그마",
      metric: "텍스트로 전환을 00% 넘겨라~",
      space: "00",
      category: "design",
      assignee: "dongho",
      status: "InProgress",
      priority: "high",
      // 날짜는 문자열로. YYYY-MM-DD 형태
      task_due_date: today.toISOString().split("T")[0], // 오늘
      ox_due_date: tomorrow.toISOString().split("T")[0], // 내일
    },
  })

  // 4-2) detail_tasks 배열 제어 (동적 폼)
  const { fields, append, remove } = useFieldArray<z.infer<typeof taskFormSchema>, "detail_tasks">({
    control: form.control,
    name: "detail_tasks",
  })

  // 5) 폼 전송 시 (onSubmit)
  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    // Extract detail_tasks from values
    const { detail_tasks, ...rest } = values;

    // Convert detail_tasks array from object to string array
    const newTask: Task = {
      id: Date.now(), // 예: 임시로 Date.now() 사용
      in_project_id: 0,
      in_project_name: "",
      ...rest,
      detail_tasks: detail_tasks.map(item => item.task),
    };

    // 상위 컴포넌트에 Task 전달
    onTaskAdd?.(newTask);

    // 성공 메시지 표출
    setSuccessMessage("Task successfully created!");

    // 폼 리셋
    form.reset();

    // 3초 뒤 성공 메시지 지우기
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Task Creation</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      {/* shadcn/ui의 Form 컴포넌트로 감싸고, 내부에 react-hook-form handleSubmit 할당 */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* -------------------- */}
          {/* Task Title */}
          <FormField
            control={form.control}
            name="task_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Task Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter task title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------------------- */}
          {/* Project Overview */}
          <FormField
            control={form.control}
            name="project_overview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Overview</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project overview" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------------------- */}
          {/* 속성값 설정: space / category / assignee / status / priority */}
          <div className="space-y-4">
            <p className="font-semibold">속성값 설정</p>
            <div className="grid grid-cols-2 gap-4">
              {/* space */}
              <FormField
                control={form.control}
                name="space"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>스페이스</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="00">00</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>카테고리</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="design" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="design">디자인</SelectItem>
                          <SelectItem value="planning">기획</SelectItem>
                          <SelectItem value="marketing">마케팅</SelectItem>
                          {/* 필요 시 추가 */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* assignee */}
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>참여자</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="dongho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dongho">동호</SelectItem>
                          <SelectItem value="dahye">다혜</SelectItem>
                          <SelectItem value="minsu">민수</SelectItem>
                          {/* 필요 시 추가 */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>스테이터스</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="InProgress" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NotStarted">진행전</SelectItem>
                          <SelectItem value="InProgress">진행중</SelectItem>
                          <SelectItem value="Completed">완료</SelectItem>
                          <SelectItem value="OnHold">보류</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>우선순위</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="high" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">높음</SelectItem>
                          <SelectItem value="medium">중간</SelectItem>
                          <SelectItem value="low">낮음</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* -------------------- */}
          {/* 상세 설명 (required) */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  상세 설명 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="상세 설명을 입력하세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------------------- */}
          {/* 상세 테스크 (useFieldArray 사용) */}
          <div>
            <FormLabel>상세 테스크</FormLabel>

            {fields.map((item, index) => (
              <div key={item.id} className="flex gap-2 mt-2">
                {/* 변경: name을 `detail_tasks.${index}.task`로 사용 */}
                <FormField
                  control={form.control}
                  name={`detail_tasks.${index}.task`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder={`상세 테스크 ${index + 1}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.length > 1 && (
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    삭제
                  </Button>
                )}
              </div>
            ))}

            {/* 변경: 새 항목을 추가할 때 객체 리터럴로 변경 */}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() => append({ task: "" })}
            >
              상세 테스크 추가
            </Button>
          </div>

          {/* -------------------- */}
          {/* 기대 결과 (optional) */}
          <FormField
            control={form.control}
            name="expected_outcome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기대 결과</FormLabel>
                <FormControl>
                  <Textarea placeholder="기대 결과를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------------------- */}
          {/* 지표 설정 (optional) */}
          <FormField
            control={form.control}
            name="metric"
            render={({ field }) => (
              <FormItem>
                <FormLabel>지표 설정</FormLabel>
                <FormControl>
                  <Textarea placeholder="지표를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------------------- */}
          {/* Task 마감일, OX 검토 마감일 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="task_due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task 마감일</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ox_due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OX 검토 마감일</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* -------------------- */}
          {/* Submit 버튼 */}
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
