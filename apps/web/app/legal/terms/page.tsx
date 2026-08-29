import { Topbar } from '../../../components/topbar'; import { SiteHeader } from '../../../components/site-header'; import { SiteFooter } from '../../../components/site-footer'; import { TermsLegal } from '../../../pages/legals/terms';
export const metadata = { title: 'Terms' };
export default function Page(){ return <div className="site-shell"><Topbar/><SiteHeader/><TermsLegal/><SiteFooter/></div>; }
