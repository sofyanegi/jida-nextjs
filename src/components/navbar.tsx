'use client';

import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/dark-toggle';

export default function Navbar() {
  const pathname = usePathname();
  const links: { name: string; route: string }[] = [
    { name: 'Beranda', route: '/' },
    { name: 'Profil', route: '/profile' },
    { name: 'Tentang', route: '/about' },
    { name: 'Blog Post', route: '/blog' },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center justify-center mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => {
              const isActive = link.route === '/' ? pathname === link.route : pathname.startsWith(link.route);
              return (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive ? 'bg-accent text-accent-foreground' : 'bg-transparent')} asChild>
                    <Link href={link.route}>{link.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
            <ModeToggle />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
