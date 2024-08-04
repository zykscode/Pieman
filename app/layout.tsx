import '#/styles/globals.css';
import '#/styles/try.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import Header from '#/components/header';
import PageHeader from '#/components/pageHeader';
import { AuthProvider } from '#/components/sessionProvider';
import { TailwindIndicator } from '#/components/tailwind-indicator';
import { ThemeProvider } from '#/components/theme-provider';
import { ThemeSwitcher } from '#/components/theme-switcher';
import { Toaster } from '#/components/ui/toaster';
import { fontSans } from '#/lib/fonts';
import { cn } from '#/lib/utils';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// export const viewport: Viewport = {
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'white' },
//     { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          {' '}
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="grid min-h-screen grid-rows-[auto_1fr_auto] pb-0">
                <Header />
                <main className="overflow-auto  px-4">{children}</main>
                <PageHeader />
              </div>
              <Toaster />
              <ThemeSwitcher />
              <Analytics />
              <TailwindIndicator />
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
