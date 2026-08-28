import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './styles.css';

export const metadata: Metadata = {
  title: { default: 'PowerPay · Digital payment rails', template: '%s · PowerPay' },
  description: 'PowerPay is a USDC-first payment experience for Solana checkout, wallet authorization, scan-to-pay and verifiable settlement.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
