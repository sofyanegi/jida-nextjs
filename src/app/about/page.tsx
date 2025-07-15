import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Code, Layers, Rocket } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  const techStack = [
    { name: 'Next.js', description: 'Framework React untuk production dengan App Router.' },
    { name: 'React', description: 'Library JavaScript untuk membangun antarmuka pengguna.' },
    { name: 'TypeScript', description: 'Superset JavaScript yang menambahkan tipe statis.' },
    { name: 'Tailwind CSS', description: 'Framework CSS utility-first untuk desain cepat.' },
    { name: 'Shadcn/ui', description: 'Koleksi komponen UI yang dapat digunakan kembali.' },
  ];

  return (
    <div className="container mx-auto max-w-3xl p-4 sm:p-8">
      <Card className="w-full">
        <CardHeader className="text-center">
          <Code className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl font-bold mt-4">Tentang Proyek Ini</CardTitle>
          <CardDescription className="text-base">Detail teknis dan tujuan dari proyek sederhana yang dibangun dengan Next.js.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h3 className="flex items-center text-xl font-semibold mb-3">
              <Rocket className="h-5 w-5 mr-2" />
              Tujuan Proyek
            </h3>
            <p className="text-muted-foreground leading-relaxed">Proyek ini dibuat sebagai bagian dari program Jabar Istimewa Digital Academy (JIDA) 2025. Tujuannya adalah untuk menerapkan konsep-konsep fundamental dari Next.js.</p>
          </section>

          <section>
            <h3 className="flex items-center text-xl font-semibold mb-3">
              <Layers className="h-5 w-5 mr-2" />
              Teknologi yang Digunakan
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {techStack.map((tech) => (
                <li key={tech.name}>
                  <span className="font-semibold text-foreground">{tech.name}:</span> {tech.description}
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
