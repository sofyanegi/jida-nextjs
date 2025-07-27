'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({
    message: 'Alamat email tidak valid.',
  }),
  password: z.string().min(8, {
    message: 'Kata sandi harus memiliki setidaknya 8 karakter.',
  }),
});

export type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  buttonText?: string;
  isSubmitting?: boolean;
}

export function LoginForm({ onSubmit, buttonText = 'Masuk', isSubmitting = false }: LoginFormProps) {
  const form: UseFormReturn<LoginFormValues> = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="nama@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kata Sandi</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          Belum punya akun?{' '}
          <Link href="/register" className="text-blue-600">
            Daftar
          </Link>
        </p>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Memproses...' : buttonText}
        </Button>
      </form>
    </Form>
  );
}
