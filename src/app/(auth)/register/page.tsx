'use client';
import { RegisterForm, RegisterFormValues } from '@/components/register-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axiosInstance from '@/lib/axios';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmitHandler(values: RegisterFormValues) {
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post('/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      if (res.status !== 201) {
        toast.error('Registrasi gagal. Silakan coba lagi.');
        return;
      }
      toast.success('Registrasi berhasil!');
      signIn('credentials', {
        redirect: true,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Registrasi gagal. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Daftar</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={onSubmitHandler} buttonText="Daftar" isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
