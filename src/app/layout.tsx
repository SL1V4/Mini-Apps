import type { Metadata } from 'next';
import './style.scss';
import { Ubuntu } from 'next/font/google';
import Header from '@/components/Header/Header';
import ReactDOM from 'react-dom/client';

const ubuntu = Ubuntu({
  subsets: ['cyrillic'],
  weight: '400',
  variable: '--ubuntu',
});

export const metadata: Metadata = {
  title: 'Simonenko Slava',
  description: 'Web-developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={ubuntu.variable}>
        <Header />
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
