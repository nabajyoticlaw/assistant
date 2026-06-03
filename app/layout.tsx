import './globals.css'; // If you have a CSS file
// layout.tsx (Server Component)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IRISH AI | Private Digital Companion & Personal Assistant',
  description: 'Experience the next evolution of digital companionship. IRISH is a private, evolving AI with long-term memory and human-like interaction.',
  keywords: 'AI companion, private AI, digital soul, personal AI assistant, local LLM',
  alternates: {
    canonical: 'https://waifu.irish/feature',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
