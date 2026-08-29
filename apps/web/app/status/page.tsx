import { Topbar } from '../../components/topbar';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { SystemStatusDashboard } from '../../components/system-status-dashboard';
export const metadata = { title: 'System Status', description: 'PowerPay Solana, Sui, provider and runtime status.' };
export default function StatusPage() { return <div className="site-shell"><Topbar /><SiteHeader active="status" /><SystemStatusDashboard /><SiteFooter /></div>; }
