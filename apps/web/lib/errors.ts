export class PowerPayWebError extends Error {
  constructor(message: string, readonly code = 'POWERPAY_WEB_ERROR', readonly status?: number) {
    super(message);
    this.name = 'PowerPayWebError';
  }
}

export function errorMessage(error: unknown, fallback = 'Something went wrong.'): string {
  return error instanceof Error && error.message ? error.message : fallback;
}
