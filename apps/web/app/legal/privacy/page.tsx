import { Topbar } from '../../../components/topbar'; import { SiteHeader } from '../../../components/site-header'; import { SiteFooter } from '../../../components/site-footer'; import { PrivacyLegal } from '../../../pages/legals/privacy';
export const metadata = { title: 'Privacy' };
export default function Page(){ return <div className="site-shell"><Topbar/><SiteHeader/><PrivacyLegal/><SiteFooter/></div>; }
