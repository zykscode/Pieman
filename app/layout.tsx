import '#/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import Header from '#/components/header';
import PageHeader from '#/components/pageHeader';
import { TailwindIndicator } from '#/components/tailwind-indicator';
import { ThemeProvider } from '#/components/theme-provider';
import { Toaster } from '#/components/ui/toaster';
import { UserProvider, WalletProvider } from '#/contexts/UserContext';
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
        <ClerkProvider>
          <UserProvider>
            <WalletProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
                    {children}
                  </main>
                  <PageHeader />
                </div>
                <Toaster />
                <Analytics />
                <TailwindIndicator />
              </ThemeProvider>
            </WalletProvider>
          </UserProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
