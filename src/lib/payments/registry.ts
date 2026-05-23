import type { PaymentProvider, PaymentProviderType } from './types';
import { stripeProvider } from './stripe-provider';

const providers: Record<PaymentProviderType, PaymentProvider> = {
  stripe: stripeProvider,
};

export const getPaymentProvider = (
  type: PaymentProviderType,
): PaymentProvider => {
  const provider = providers[type];
  if (!provider) {
    throw new Error(`Unknown payment provider: "${type}"`);
  }
  return provider;
};

export const availableProviders = Object.keys(
  providers,
) as PaymentProviderType[];
