import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GoPratle | Event Requirement Posting Flow',
  description: 'Adaptive 4-step event requirement posting platform for Event Planners, Performers, and Production Crew. Built with Next.js, Node.js, Express, and MongoDB.',
  keywords: ['GoPratle', 'Event Requirements', 'Event Planner', 'Performer Booking', 'Production Crew', 'Full Stack Assignment'],
  authors: [{ name: 'GoPratle Full Stack Intern' }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
