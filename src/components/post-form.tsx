'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
});

export type PostFormValues = z.infer<typeof formSchema>;

interface PostFormProps {
  onSubmit: (values: PostFormValues) => void;
  initialData?: Partial<Post>;
  buttonText?: string;
  isSubmitting?: boolean;
}

export function PostForm({ onSubmit, initialData, buttonText = 'Submit', isSubmitting = false }: PostFormProps) {
  const router = useRouter();
  const form: UseFormReturn<PostFormValues> = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title" {...field} />
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
                <Textarea placeholder="Enter description here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : buttonText}
        </Button>

        {initialData && (
          <Button
            type="button"
            variant="outline"
            className="ml-2"
            onClick={() => {
              form.reset();
              router.back();
            }}
          >
            Cancel
          </Button>
        )}
      </form>
    </Form>
  );
}
