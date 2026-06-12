import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';
import { QueryProvider } from './providers';

export const metadata: Metadata = {
  title: 'PLD Investigations',
  description: 'Painel local para alertas, investigacoes, relatorios e auditoria PLD.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
