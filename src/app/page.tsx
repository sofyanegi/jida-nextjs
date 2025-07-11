import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <Avatar className="w-28 h-28 mb-4 border-2 border-gray-200">
          <AvatarImage src="https://github.com/sofyanegi.png" alt="Sofyan Egi Lesmana" />
          <AvatarFallback>SEL</AvatarFallback>
        </Avatar>

        <h1 className="text-3xl md:text-4xl font-bold">Sofyan Egi Lesmana</h1>
        <p className="mt-2 text-lg text-muted-foreground">Peserta Program Jabar Istimewa Digital Academy 2025</p>

        <div className="mt-8 flex gap-4">
          <Link href="/profile">
            <Button>Profil Saya</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline">Tentang Proyek</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
