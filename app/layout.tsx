import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { cn } from '@/lib/utils';
import NavBar from '@/components/NavBar';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: '꾹꾹',
    template: '꾹꾹 | %s',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'w-[100vw] flex flex-col items-center')}>
        <header className="border-b px-4 py-2 w-full top-0 sticky bg-background z-40">
          <SessionProvider>
            <NavBar />
          </SessionProvider>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
