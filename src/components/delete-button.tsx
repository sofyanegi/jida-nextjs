'use client';

import { TrashIcon } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function DeleteButton(props: { params: string; url: string; succesMessage: string }) {
  const { params, url, succesMessage } = props;
  const router = useRouter();

  const onDelete = async (params: string, url: string, succesMessage: string) => {
    try {
      const response = await fetch(`${url}/${params}`, { method: 'DELETE' });

      if (!response.ok) throw new Error('Failed to delete data');

      toast.success(succesMessage);
      router.back();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Failed to delete data.');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(params, url, succesMessage)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
