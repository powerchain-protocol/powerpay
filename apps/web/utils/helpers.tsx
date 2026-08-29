import type { ReactNode } from 'react';
import { StatusBadge, type StatusBadgeTone } from '@powerpay/ui';

export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export function Badge({ children, tone = 'neutral', dot = false, title }: { children: ReactNode; tone?: StatusBadgeTone; dot?: boolean; title?: string }) {
  return <StatusBadge tone={tone} dot={dot} title={title}>{children}</StatusBadge>;
}
