export type PaymentProviderType = 'stripe';

/** Controlled via PAYMENT_PROVIDER env var. Change it to 'square' if Stripe goes down. */
export const DEFAULT_PROVIDER: PaymentProviderType =
  (process.env.PAYMENT_PROVIDER as PaymentProviderType) || 'stripe';

export interface CheckoutLineItem {
  name: string;
  quantity: number;
  /** Price in cents (e.g. $95.00 = 9500) */
  unitAmountCents: number;
}

export interface CreateCheckoutParams {
  lineItems: CheckoutLineItem[];
  metadata: Record<string, string>;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  checkoutUrl: string;
  sessionId: string;
}

export interface PaymentProvider {
  readonly name: PaymentProviderType;
  createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutResult>;
}
