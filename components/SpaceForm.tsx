"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Space } from '@/types/space';

const spaceFormSchema = z.object({
  name: z.string().min(1, '스페이스 이름을 입력해주세요'),
  description: z.string().min(1, '스페이스 설명을 입력해주세요'),
});

interface SpaceFormProps {
  onSpaceAdd: (space: Space) => void;
}

export default function SpaceForm({ onSpaceAdd }: SpaceFormProps) {
  const [successMessage, setSuccessMessage] = useState('');

  const form = useForm<z.infer<typeof spaceFormSchema>>({
    resolver: zodResolver(spaceFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof spaceFormSchema>) {
    const newSpace: Space = {
      id: Date.now(),
      name: values.name,
      description: values.description,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSpaceAdd(newSpace);
    setSuccessMessage('Space successfully created!');
    form.reset();

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Space</h2>
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Space Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter space name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter space description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create Space</Button>
        </form>
      </Form>
    </div>
  );
} 