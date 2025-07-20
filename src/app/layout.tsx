import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { Toaster } from 'sonner';
import StoreProvider from './store-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | JIDA Sofyanegi',
    default: 'JIDA Sofyanegi',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <NextTopLoader color="#3b82f6" initialPosition={0.08} crawlSpeed={200} height={4} crawl={true} showSpinner={true} easing="ease" speed={200} shadow="0 0 10px #3b82f6,0 0 5px #3b82f6" />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
            <Toaster richColors closeButton />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
