'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoginForm, LoginFormValues } from '@/components/login-form';

export default function LoginFromWrapper() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  async function onSubmitHandler(values: LoginFormValues) {
    setIsSubmitting(true);

    try {
      const res = await signIn('credentials', {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      if (res?.error) {
        toast.error('Email atau password salah.');
        return;
      }

      toast.success('Login berhasil!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any) {
      console.error('Login error:', error);
      toast.error(error?.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <LoginForm onSubmit={onSubmitHandler} buttonText="Masuk" isSubmitting={isSubmitting} />;
}
