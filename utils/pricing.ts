import { PRICING } from '@/constants';
import { BookingFormData, PricingBreakdown } from '@/types';

export const calculatePricing = (formData: BookingFormData): PricingBreakdown => {
  const totalParticipants = formData.adults + formData.children + formData.infants;

  const basePrice =
    formData.adults * PRICING.adult +
    formData.children * PRICING.child +
    formData.infants * PRICING.infant;

  const subtotal = basePrice;
  const processingFee = (subtotal * PRICING.processingFeeRate) / 100;
  const total = subtotal + processingFee;

  return { basePrice, subtotal, processingFee, total, totalParticipants };
};

export const getMinBookingDate = (): string => {
  return new Date().toISOString().split('T')[0];
};
