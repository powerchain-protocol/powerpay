export type SocialKind = 'x' | 'github' | 'telegram' | 'medium';
export function SocialIcon({ kind }: { kind: SocialKind }) {
  if (kind === 'x') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4l14 16M19 4L5 20" /></svg>;
  if (kind === 'telegram') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5L21 4l-4.2 16-5.2-4-3.1 2.4.7-4.7L17 7.4 7.9 13.2z" /></svg>;
  if (kind === 'medium') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h4l4 9 4-9h4M6 7v10M18 7v10" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 19c-4 1-4-2-5-2m10 4v-3c0-1 .1-1.8-.5-2.4 3.5-.4 7.2-1.7 7.2-7.8A6 6 0 0 0 18 3.6 5.6 5.6 0 0 0 17.8 0S16.5-.4 13 1.6a15 15 0 0 0-8 0C1.5-.4.2 0 .2 0A5.6 5.6 0 0 0 0 3.6a6 6 0 0 0-1.7 4.2c0 6.1 3.7 7.4 7.2 7.8-.5.5-.7 1.2-.7 2.4v3" transform="translate(2 2) scale(.83)" /></svg>;
}
