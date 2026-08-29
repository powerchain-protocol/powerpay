import { Topbar } from '../../components/topbar';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { ProductPageContent } from '../../pages/product';
export const metadata = { title: 'Products', description: 'PowerPay mobile, checkout and merchant payment products.' };
export default function ProductPage() { return <div className="site-shell"><Topbar /><SiteHeader active="product" /><ProductPageContent /><SiteFooter /></div>; }
