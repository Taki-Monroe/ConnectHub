import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { CreatePostInput } from '../../types/post';

const schema = z.object({
  content: z.string()
    .min(1, 'Post content is required')
    .max(500, 'Post content must be less than 500 characters')
});

interface CreatePostProps {
  onSubmit: (data: CreatePostInput) => Promise<void>;
}

export function CreatePost({ onSubmit }: CreatePostProps) {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<CreatePostInput>({
    resolver: zodResolver(schema)
  });

  const handleCreatePost = async (data: CreatePostInput) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form 
      onSubmit={handleSubmit(handleCreatePost)}
      className="bg-white rounded-lg shadow-sm p-4 space-y-4"
    >
      <textarea
        {...register('content')}
        placeholder="What's on your mind?"
        className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      {errors.content && (
        <p className="text-sm text-red-600">{errors.content.message}</p>
      )}
      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Post
        </Button>
      </div>
    </form>
  );
}