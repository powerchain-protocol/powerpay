import { Topbar } from '../../../components/topbar'; import { SiteHeader } from '../../../components/site-header'; import { SiteFooter } from '../../../components/site-footer'; import { CookiesLegal } from '../../../pages/legals/cookies';
export const metadata = { title: 'Cookies' };
export default function Page(){ return <div className="site-shell"><Topbar/><SiteHeader/><CookiesLegal/><SiteFooter/></div>; }
