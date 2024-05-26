import type { Metadata } from 'next';
import ReactDOM from 'react-dom/client';

export const metadata: Metadata = {
  title: 'Uta Pleasure',
  description: 'Music App',
};

export default function UtaPleasureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>

        {children}

      </body>
    </html>
  );
}
