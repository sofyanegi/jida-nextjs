'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { ModeToggle } from '@/components/dark-toggle';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();
  const [open, setOpen] = useState(false);

  const links: { name: string; route: string }[] = [
    { name: 'Beranda', route: '/' },
    { name: 'Profil', route: '/profile' },
    { name: 'Tentang', route: '/about' },
    { name: 'Blog Post', route: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center justify-between mx-auto p-2 md:p-0">
        <Link href="/" className="text-lg font-semibold">
          JIDA
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((link) => {
                const isActive = link.route === '/' ? pathname === link.route : pathname.startsWith(link.route);
                return (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive && 'bg-accent text-accent-foreground')} asChild>
                      <Link href={link.route}>{link.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />

          {!['/login', '/register'].includes(pathname) &&
            (status === 'unauthenticated' ? (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              </div>
            ) : (
              <Button variant="outline" onClick={() => signOut({ redirect: true })}>
                Logout
              </Button>
            ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden p-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle>Navigation</SheetTitle>
              <div className="flex flex-col space-y-4 mt-6">
                {links.map((link) => {
                  const isActive = link.route === '/' ? pathname === link.route : pathname.startsWith(link.route);
                  return (
                    <Link key={link.name} href={link.route} className={cn('px-2 py-1 text-sm rounded hover:bg-accent transition', isActive && 'bg-accent text-accent-foreground')} onClick={() => setOpen(false)}>
                      {link.name}
                    </Link>
                  );
                })}

                <ModeToggle />

                {!['/login', '/register'].includes(pathname) &&
                  (status === 'unauthenticated' ? (
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button className="w-full" variant="outline">
                        Login
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={async () => {
                        setOpen(false);
                        await signOut({ redirect: true });
                      }}
                    >
                      Logout
                    </Button>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
