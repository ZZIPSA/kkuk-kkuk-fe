import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { DOMAIN } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: '꾹꾹',
    template: '꾹꾹 | %s',
  },
  metadataBase: new URL(DOMAIN),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'w-[100vw] flex flex-col items-center')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
