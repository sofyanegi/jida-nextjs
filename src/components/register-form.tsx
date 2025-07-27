'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// Skema validasi untuk formulir pendaftaran
const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Nama harus memiliki setidaknya 2 karakter.',
    }),
    email: z.string().email({
      message: 'Alamat email tidak valid.',
    }),
    password: z.string().min(8, {
      message: 'Kata sandi harus memiliki setidaknya 8 karakter.',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak cocok.',
    path: ['confirmPassword'], // Menampilkan pesan error di bawah field konfirmasi kata sandi
  });

// Mengekstrak tipe dari skema Zod
export type RegisterFormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
  buttonText?: string;
  isSubmitting?: boolean;
}

export function RegisterForm({ onSubmit, buttonText = 'Daftar', isSubmitting = false }: RegisterFormProps) {
  // Inisialisasi form dengan react-hook-form
  const form: UseFormReturn<RegisterFormValues> = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        {/* Field untuk Nama */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field untuk Email */}
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
        {/* Field untuk Kata Sandi */}
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
        {/* Field untuk Konfirmasi Kata Sandi */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Kata Sandi</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          Sudah punya akun?{' '}
          <Link href="/login" className="text-blue-600">
            Masuk
          </Link>
        </p>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Memproses...' : buttonText}
        </Button>
      </form>
    </Form>
  );
}
