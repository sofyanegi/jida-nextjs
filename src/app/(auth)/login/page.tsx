import LoginFromWrapper from '@/components/login-form-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <LoginFromWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
