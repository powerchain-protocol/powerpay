export function compactAddress(value:string,head=5,tail=4):string{if(!value)return'';if(value.length<=head+tail+1)return value;return `${value.slice(0,head)}…${value.slice(-tail)}`}
export function formatNumber(value:string|number,maximumFractionDigits=2):string{const numeric=typeof value==='number'?value:Number(value);if(!Number.isFinite(numeric))return'—';return new Intl.NumberFormat(undefined,{maximumFractionDigits}).format(numeric)}
export function formatBps(bps:number):string{return `${(bps/100).toFixed(2)}%`}
export function secondsUntil(iso:string|undefined,now=Date.now()):number{if(!iso)return 0;const parsed=Date.parse(iso);return Number.isFinite(parsed)?Math.max(0,Math.floor((parsed-now)/1000)):0}
export function formatCountdown(seconds:number):string{const safe=Math.max(0,Math.floor(seconds));return `${String(Math.floor(safe/60)).padStart(2,'0')}:${String(safe%60).padStart(2,'0')}`}
export function clampAmount(value:number,min=0,max=100_000):number{return Math.min(max,Math.max(min,value))}
