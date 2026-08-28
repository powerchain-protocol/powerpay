'use client';

import { useEffect, useRef } from 'react';
import { WalletIcon } from '@powerpay/ui';

type WalletKind = 'phantom' | 'solflare' | 'backpack';

export interface BrowserSolanaProvider {
  publicKey?: { toBase58(): string };
  isConnected?: boolean;
  connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: { toBase58(): string } }>;
  disconnect?(): Promise<void>;
  signTransaction<T>(transaction: T): Promise<T>;
}

declare global {
  interface Window {
    phantom?: { solana?: BrowserSolanaProvider };
    solflare?: BrowserSolanaProvider;
    backpack?: { solana?: BrowserSolanaProvider };
    solana?: BrowserSolanaProvider & { isPhantom?: boolean };
  }
}

function providerFor(kind: WalletKind): BrowserSolanaProvider | undefined {
  if (typeof window === 'undefined') return undefined;
  if (kind === 'phantom') return window.phantom?.solana || (window.solana?.isPhantom ? window.solana : undefined);
  if (kind === 'solflare') return window.solflare;
  return window.backpack?.solana;
}

export function WalletConnectModal({ open, onClose, onConnected }: { open: boolean; onClose(): void; onConnected(provider: BrowserSolanaProvider, address: string, kind: WalletKind): void }) {
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex=\"-1\"])') || []);
    const first = focusable()[0];
    first?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) { event.preventDefault(); lastItem.focus(); }
      else if (!event.shiftKey && document.activeElement === lastItem) { event.preventDefault(); firstItem.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = previousOverflow; previous?.focus(); };
  }, [open]);
  if (!open) return null;
  const connect = async (kind: WalletKind) => {
    const provider = providerFor(kind);
    if (!provider) {
      window.open(kind === 'phantom' ? 'https://phantom.app/' : kind === 'solflare' ? 'https://solflare.com/' : 'https://backpack.app/', '_blank', 'noopener,noreferrer');
      return;
    }
    const result = await provider.connect();
    onConnected(provider, result.publicKey.toBase58(), kind);
    onClose();
  };
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} className="wallet-modal" role="dialog" aria-modal="true" aria-labelledby="wallet-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close wallet dialog">×</button>
        <img className="wallet-modal-mark" src="/assets/brand/powerpay-mark-green.png" alt="" />
        <span className="section-kicker">Wallet authorization</span>
        <h2 id="wallet-title">Connect a Solana wallet</h2>
        <p>PowerPay can request transaction signatures. Your private keys never leave your wallet.</p>
        <div className="wallet-list">
          <button type="button" onClick={() => void connect('phantom')}><WalletIcon wallet="phantom" size={34} /><span><strong>Phantom</strong><small>Connect or install</small></span><b>›</b></button>
          <button type="button" onClick={() => void connect('solflare')}><WalletIcon wallet="solflare" size={34} /><span><strong>Solflare</strong><small>Connect or install</small></span><b>›</b></button>
          <button type="button" onClick={() => void connect('backpack')}><WalletIcon wallet="backpack" size={34} /><span><strong>Backpack</strong><small>Connect or install</small></span><b>›</b></button>
          <button type="button" className="wallet-disabled" disabled><WalletIcon wallet="walletConnect" size={34} /><span><strong>WalletConnect</strong><small>Requires Reown project configuration</small></span><b>—</b></button>
        </div>
        <div className="wallet-safety">▣ Non-custodial · Wallet approval required for every payment</div>
      </section>
    </div>
  );
}
