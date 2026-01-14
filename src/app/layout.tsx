import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/context/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import RootLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'RoamReady',
  description: 'Your next adventure awaits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = headers().get('x-next-pathname') || '';

  const isDashboardLayout = [
    '/dashboard',
    '/my-trips',
    '/wishlist',
    '/bookings',
    '/transactions',
    '/settings',
    '/schedule',
    '/rewards',
  ].some((path) => pathname.startsWith(path));

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <RootLayoutClient isDashboard={isDashboardLayout}>
              {children}
            </RootLayoutClient>
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
