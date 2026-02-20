// src/app/layout.tsx
import type { Metadata } from 'next';
import { ReduxProvider } from '@/components/ui/ReduxProvider';
import { MuiProvider } from '@/components/ui/MuiProvider';

export const metadata: Metadata = {
  title: { template: '%s | Application Form', default: 'Application Form' },
  description: 'Multi-step application form',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <MuiProvider>{children}</MuiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
