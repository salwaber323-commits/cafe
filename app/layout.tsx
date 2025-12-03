import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900']
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Kopi & Kenangan - Setiap Tegukan Menyimpan Cerita',
  description: 'Nikmati kopi premium dengan suasana yang menenangkan. Setiap cangkir diracik dengan dedikasi dan rasa yang tak terlupakan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
