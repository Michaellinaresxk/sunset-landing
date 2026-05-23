// src/utils/pricing.ts
import { PRICING } from '@/src/constants';
import { BookingFormData, PricingBreakdown } from '@/src/types';

export const calculatePricing = (
  formData: BookingFormData,
): PricingBreakdown => {
  const tier = PRICING[formData.experience];
  const totalParticipants = formData.adults + formData.children;

  const basePrice =
    formData.adults * tier.adult + formData.children * tier.child;

  const subtotal = basePrice;
  const processingFee = (subtotal * PRICING.processingFeeRate) / 100;
  const total = subtotal + processingFee;

  return { basePrice, subtotal, processingFee, total, totalParticipants };
};
