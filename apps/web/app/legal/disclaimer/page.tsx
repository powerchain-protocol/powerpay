import { Topbar } from '../../../components/topbar'; import { SiteHeader } from '../../../components/site-header'; import { SiteFooter } from '../../../components/site-footer'; import { DisclaimerLegal } from '../../../pages/legals/disclaimer';
export const metadata = { title: 'Disclaimer' };
export default function Page(){ return <div className="site-shell"><Topbar/><SiteHeader/><DisclaimerLegal/><SiteFooter/></div>; }
