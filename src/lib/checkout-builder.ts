import { PRICING } from '@/src/constants';
import type { BookingFormData } from '@/src/types';
import type { CheckoutLineItem } from '@/src/lib/payments';

export const buildLineItems = (
  formData: BookingFormData,
): CheckoutLineItem[] => {
  const tier = PRICING[formData.experience];
  const items: CheckoutLineItem[] = [];

  if (formData.adults > 0) {
    items.push({
      name: `${tier.label} — Adult`,
      quantity: formData.adults,
      unitAmountCents: tier.adult * 100,
    });
  }

  if (formData.children > 0) {
    items.push({
      name: `${tier.label} — Child (5-10y)`,
      quantity: formData.children,
      unitAmountCents: tier.child * 100,
    });
  }

  return items;
};

export const buildCheckoutMetadata = (formData: BookingFormData) => ({
  experience: formData.experience,
  bookingDate: formData.date,
  pickupTime: formData.timeSlot,
  pickupLocation: formData.pickupLocation,
  adults: String(formData.adults),
  children: String(formData.children),
});
