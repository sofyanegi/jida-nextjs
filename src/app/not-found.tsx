import Link from 'next/link';
import { Button } from '@/components/ui/button'; // <-- Import Button

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-muted-foreground mb-6">Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
      <Button asChild>
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
