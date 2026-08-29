import type { ReactNode } from 'react';

export type StatusBadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export function StatusBadge({ children, tone = 'neutral', dot = false, title }: { children: ReactNode; tone?: StatusBadgeTone; dot?: boolean; title?: string }) {
  return <span className={`status-badge ${tone}`} title={title}>{dot ? <span className="status-badge-dot" aria-hidden="true" /> : null}{children}</span>;
}
