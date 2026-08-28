export const SOLANA_ACTION_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,PUT,OPTIONS',
  'access-control-allow-headers': 'Content-Type, Authorization, Content-Encoding, Accept-Encoding, X-Idempotency-Key',
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

export function actionsManifest() {
  return {
    rules: [
      { pathPattern: '/pay/*', apiPath: '/api/actions/pay/*' },
      { pathPattern: '/checkout/*', apiPath: '/api/actions/pay/*' },
      { pathPattern: '/api/actions/**', apiPath: '/api/actions/**' },
    ],
  };
}

export function actionGetResponse(input: { icon: string; merchant: string; amount: string; asset: string; description?: string }) {
  return {
    type: 'action',
    icon: input.icon,
    title: `Pay ${input.merchant}`,
    description: input.description ?? `Secure PowerPay checkout for ${input.amount} ${input.asset}.`,
    label: `Pay ${input.amount} ${input.asset}`,
  };
}
