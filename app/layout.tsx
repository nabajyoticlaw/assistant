import './globals.css'; // If you have a CSS file
import type { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Assistant AI',
  description: 'License and Download Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
