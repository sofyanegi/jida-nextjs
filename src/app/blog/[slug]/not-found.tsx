import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileX2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center p-4">
      <FileX2 className="h-20 w-20 text-muted-foreground mb-4" />
      <h1 className="text-4xl font-bold">Postingan Tidak Ditemukan</h1>
      <p className="text-muted-foreground mt-2 mb-6 max-w-md">Maaf, kami tidak dapat menemukan postingan yang Anda cari. Mungkin tautan tersebut sudah usang atau artikelnya telah dipindahkan.</p>
      <Button asChild>
        <Link href="/blog">Lihat Semua Postingan</Link>
      </Button>
    </div>
  );
}
