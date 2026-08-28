import { AssetIcon, NetworkIcon, WalletIcon } from '@powerpay/ui';
import { POWERPAY_ASSET_VISUALS, POWERPAY_PUBLIC_ASSETS } from '@powerpay/shared/assets';

const wallets = ['phantom', 'solflare', 'backpack', 'walletConnect'] as const;

export default function AssetPreviewPage() {
  const symbols = Object.keys(POWERPAY_ASSET_VISUALS) as Array<keyof typeof POWERPAY_ASSET_VISUALS>;
  return <main className="page">
    <header className="header">
      <img src={POWERPAY_PUBLIC_ASSETS.brand.mark} alt="PowerPay mark" width={44} height={44}/>
      <div><div className="wordmark"><span>Power</span><strong>Pay</strong></div><p>Canonical public asset preview</p></div>
    </header>

    <section>
      <h1>One asset registry</h1>
      <p>PowerPay-owned PWRC/wPWRC and brand visuals stay local. Ecosystem token, network and wallet identities use pinned Web3 Icons assets.</p>
      <div className="grid">
        {symbols.map(symbol => <article className="card" key={symbol}>
          <AssetIcon asset={symbol} size={48} detailed={symbol === 'PWRC' || symbol === 'wPWRC'}/>
          <div><strong>{symbol}</strong><span>{POWERPAY_ASSET_VISUALS[symbol].name}</span><small>{POWERPAY_ASSET_VISUALS[symbol].source}</small></div>
        </article>)}
      </div>
    </section>

    <section>
      <h2>PowerPay-owned scale behavior</h2>
      <p>Small UI uses simplified marks. Premium coin art is reserved for medium/large surfaces.</p>
      <div className="scaleGrid">
        <div className="scaleCard"><strong>PWRC</strong><div className="row"><AssetIcon asset="PWRC" size={24}/><AssetIcon asset="PWRC" size={48} detailed/><AssetIcon asset="PWRC" size={112} detailed/></div></div>
        <div className="scaleCard"><strong>wPWRC</strong><div className="row"><AssetIcon asset="wPWRC" size={24}/><AssetIcon asset="wPWRC" size={48} detailed/><AssetIcon asset="wPWRC" size={112} detailed/></div></div>
      </div>
    </section>

    <section>
      <h2>Brand tones</h2>
      <div className="brandGrid">
        <div className="brandTile light"><img src={POWERPAY_PUBLIC_ASSETS.brand.markGreen} alt="PowerPay green mark" width={62} height={62}/><span>Green</span></div>
        <div className="brandTile dark"><img src={POWERPAY_PUBLIC_ASSETS.brand.markWhite} alt="PowerPay white mark" width={62} height={62}/><span>White</span></div>
        <div className="brandTile light"><img src={POWERPAY_PUBLIC_ASSETS.brand.markDark} alt="PowerPay dark mark" width={62} height={62}/><span>Dark</span></div>
      </div>
    </section>

    <section>
      <h2>Networks & wallets</h2>
      <div className="grid">
        <article className="card"><NetworkIcon network="solana" size={42}/><div><strong>Solana</strong><span>Network identity</span></div></article>
        <article className="card"><NetworkIcon network="sui" size={42}/><div><strong>Sui</strong><span>Network identity</span></div></article>
        {wallets.map(wallet => <article className="card" key={wallet}><WalletIcon wallet={wallet} size={42}/><div><strong>{wallet === 'walletConnect' ? 'WalletConnect' : wallet[0].toUpperCase()+wallet.slice(1)}</strong><span>Wallet identity</span></div></article>)}
      </div>
    </section>
  </main>;
}
