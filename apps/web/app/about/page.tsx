import { Topbar } from '../../components/topbar'; import { SiteHeader } from '../../components/site-header'; import { SiteFooter } from '../../components/site-footer'; import { AboutPageContent } from '../../pages/about';
export const metadata = { title: 'About' };
export default function AboutPage(){return <div className="site-shell"><Topbar/><SiteHeader active="about"/><AboutPageContent/><SiteFooter/></div>}
