import { PRICING } from '@/src/constants';
import type { BookingFormData } from '@/src/types';
import type { CheckoutLineItem } from '@/src/lib/payments';

export const buildLineItems = (
  formData: BookingFormData,
): CheckoutLineItem[] => {
  const items: CheckoutLineItem[] = [];

  if (formData.adults > 0) {
    items.push({
      name: 'Sunset Horseback Riding — Adult',
      quantity: formData.adults,
      unitAmountCents: PRICING.adult * 100,
    });
  }

  if (formData.children > 0) {
    items.push({
      name: 'Sunset Horseback Riding — Child (5-10y)',
      quantity: formData.children,
      unitAmountCents: PRICING.child * 100,
    });
  }

  return items;
};

export const buildCheckoutMetadata = (formData: BookingFormData) => ({
  bookingDate: formData.date,
  pickupTime: formData.timeSlot,
  pickupLocation: formData.pickupLocation,
  adults: String(formData.adults),
  children: String(formData.children),
});
