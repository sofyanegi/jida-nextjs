import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Page() {
  const coreSkills = ['React.js', 'JavaScript', 'TypeScript', 'Node.js', 'GoLang', 'Laravel', 'Tailwind CSS', 'RESTful APIs', 'AWS', 'GCP', 'MySQL', 'PostgreSQL'];

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <aside className="lg:col-span-1">
          <div className="sticky top-8 flex flex-col items-center space-y-4 text-center lg:items-start lg:text-left">
            <Avatar className="h-32 w-32">
              <AvatarImage src="https://github.com/sofyanegi.png" alt="Sofyan Egi Lesmana" />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">SOFYAN EGI LESMANA</h1>
              <p className="text-muted-foreground">Web Developer</p>
            </div>

            <div className="flex space-x-4">
              <a href="mailto:contact.sofyanegi@gmail.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://github.com/sofyanegil" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/sofyanegi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <div className="w-full pt-4">
              <h2 className="text-lg font-semibold">Skill</h2>
              <div className="mt-2 flex flex-wrap gap-2 lg:justify-start">
                {coreSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">Tentang Saya</h2>
              <p className="text-muted-foreground text-justify">
                Developer dengan pengalaman satu tahun yang berspesialisasi dalam membangun aplikasi web dinamis menggunakan kerangka kerja seperti Laravel, React, dan Express. Saya memiliki fondasi kuat dalam pengembangan full-stack dan
                pemahaman solid tentang dukungan IT serta komputasi awan.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">Pendidikan</h2>
              <p className="font-semibold">Universitas Pasundan - Bandung </p>
              <p className="text-muted-foreground">Lulusan Sarjana Teknik Informatika dengan IPK 3.85/4.00.</p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
