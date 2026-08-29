'use client';

import { useEffect, useState } from 'react';
import { WalletIcon } from '@powerpay/ui';
import { compactAddress } from '../utils/util';
import { connectedBrowserWallet, WALLET_CONNECTED_EVENT, WalletConnectModal, type BrowserSolanaProvider, type WalletKind } from './wallet-connect-modal';

export function HeaderWalletConnect() {
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState<{ provider: BrowserSolanaProvider; address: string; kind: WalletKind } | null>(null);
  useEffect(() => {
    const sync = () => { const next = connectedBrowserWallet(); if (next) setWallet(next); };
    sync(); window.addEventListener(WALLET_CONNECTED_EVENT, sync); return () => window.removeEventListener(WALLET_CONNECTED_EVENT, sync);
  }, []);
  return <><button type="button" className={wallet ? 'header-connect connected' : 'header-connect'} onClick={() => setOpen(true)}>{wallet ? <WalletIcon wallet={wallet.kind} size={20} /> : <span className="header-connect-dot" />}<span>{wallet ? compactAddress(wallet.address, 4, 4) : 'Connect'}</span></button><WalletConnectModal open={open} onClose={() => setOpen(false)} onConnected={(provider,address,kind)=>setWallet({provider,address,kind})}/></>;
}
