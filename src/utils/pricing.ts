import { PRICING } from '@/src/constants';
import { BookingFormData, PricingBreakdown } from '@/src/types';

export const calculatePricing = (
  formData: BookingFormData,
): PricingBreakdown => {
  const totalParticipants = formData.adults + formData.children;

  const basePrice =
    formData.adults * PRICING.adult + formData.children * PRICING.child;

  const subtotal = basePrice;
  const processingFee = (subtotal * PRICING.processingFeeRate) / 100;
  const total = subtotal + processingFee;

  return { basePrice, subtotal, processingFee, total, totalParticipants };
};
