import '#/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import Script from 'next/script';

import { AuthProvider } from '#/components/AuthContext';
import BottomNav from '#/components/BottomNav';
import Header from '#/components/header';
import PiSdkLoader from '#/components/PiSdkLoader';
import Sidebar from '#/components/Sidebar';
import { TailwindIndicator } from '#/components/tailwind-indicator';
import { ThemeProvider } from '#/components/theme-provider';
import { Toaster } from '#/components/ui/toaster';
import { fontSans } from '#/lib/fonts';
import { cn } from '#/lib/utils';

export const metadata: Metadata = {
  title: 'MiddleMan - Secure Pi to Naira Exchanges',
  description: 'Your trusted escrow for Pi to Naira exchanges',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <PiSdkLoader />
        <Script
          src="https://sdk.minepi.com/pi-sdk.js"
          strategy="beforeInteractive"
        />
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col md:pl-64">
                <Header />
                <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
                  {children}
                </main>
                <BottomNav />
              </div>
            </div>
            <Toaster />
            <Analytics />
            <TailwindIndicator />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
