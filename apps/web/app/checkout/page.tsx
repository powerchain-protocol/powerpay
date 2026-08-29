import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { CheckoutApp } from '../../components/checkout-app';
import { Topbar } from '../../components/topbar';

export const metadata = { title: 'Checkout · PowerPay', description: 'USDC-first non-custodial checkout powered by the PowerPay canonical payment engine.' };

export default function CheckoutPage() {
  return <div className="site-shell"><Topbar /><SiteHeader active="checkout" /><main className="checkout-page"><CheckoutApp /></main><SiteFooter /></div>;
}
