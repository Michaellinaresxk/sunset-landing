'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  User,
  Baby,
  AlertTriangle,
  CreditCard,
  Loader2,
  Truck,
  Check,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import { BookingFormData, FormErrors } from '@/src/types';
import { PRICING, TIME_SLOTS } from '@/src/constants';
import { calculatePricing, getMinBookingDate } from '@/src/utils/pricing';
import ParticipantCounter from '@/src/components/ui/ParticipantCounter';
import PriceSummary from './PriceSummary';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  promoApplied?: boolean;
}

const TRANSPORT_VALUE = 30;
const MIN_GUESTS_FOR_PROMO = 2;

export default function BookingModal({
  isOpen,
  onClose,
  promoApplied = false,
}: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    date: '',
    timeSlot: '',
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When promo is applied, ensure at least 2 adults
  useEffect(() => {
    if (promoApplied && formData.adults < MIN_GUESTS_FOR_PROMO) {
      setFormData((prev) => ({ ...prev, adults: MIN_GUESTS_FOR_PROMO }));
    }
  }, [promoApplied]);

  const pricing = useMemo(() => calculatePricing(formData), [formData]);
  const [isTimeSlotOpen, setIsTimeSlotOpen] = useState(false);

  const totalGuests = formData.adults + formData.children;
  const isPromoEligible = promoApplied && totalGuests >= MIN_GUESTS_FOR_PROMO;

  const updateField = useCallback(
    (field: keyof BookingFormData, value: number | string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (prev[field]) {
          const { [field]: _, ...rest } = prev;
          return rest;
        }
        return prev;
      });
    },
    [],
  );

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Pickup time is required';
    if (pricing.totalParticipants === 0)
      newErrors.participants = 'At least one participant is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          promoApplied: isPromoEligible,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('[BookingModal] Checkout error:', error);
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : 'Failed to start checkout. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 backdrop-blur-2xl animate-fadeIn overflow-y-auto'>
      <div className='bg-zinc-900 rounded-3xl max-w-2xl w-full border border-white/10 my-8'>
        {/* Header */}
        <div className='bg-gradient-to-r from-amber-500 to-orange-500 px-6 md:px-8 py-6 rounded-t-3xl'>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-2xl md:text-3xl font-light text-white mb-2 tracking-tight'>
                Book Your Experience
              </h3>
              <p className='text-amber-50 text-sm font-light'>
                Sunset Horseback Riding - From ${PRICING.adult}/person
              </p>
            </div>
            <button
              onClick={onClose}
              className='text-white/80 hover:text-white transition-colors'
            >
              <X className='w-6 h-6' />
            </button>
          </div>
        </div>

        <div className='p-6 md:p-8 space-y-6'>
          {/* Promo Applied Banner */}
          {promoApplied && (
            <div
              className={`rounded-xl p-4 border transition-all duration-500 ${
                isPromoEligible
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : 'bg-amber-500/10 border-amber-500/20'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isPromoEligible ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                  }`}
                >
                  {isPromoEligible ? (
                    <Check className='w-5 h-5 text-emerald-400' />
                  ) : (
                    <Truck className='w-5 h-5 text-amber-400' />
                  )}
                </div>
                <div className='flex-1 min-w-0'>
                  <div
                    className={`text-sm font-medium ${
                      isPromoEligible ? 'text-emerald-300' : 'text-amber-300'
                    }`}
                  >
                    {isPromoEligible
                      ? 'Free Transport Applied!'
                      : 'Free Transport — Add 1 more guest'}
                  </div>
                  <div className='text-xs text-white/40 mt-0.5'>
                    {isPromoEligible
                      ? `You're saving $${TRANSPORT_VALUE} on pickup transport`
                      : `Book ${MIN_GUESTS_FOR_PROMO}+ guests to unlock free pickup transport`}
                  </div>
                </div>
                {isPromoEligible && (
                  <div className='text-sm font-medium text-emerald-400 flex-shrink-0'>
                    −${TRANSPORT_VALUE}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Date */}
          <div>
            <label className='flex items-center text-sm font-medium text-white/70 mb-2'>
              <Calendar className='w-4 h-4 mr-2 text-amber-400' />
              Select Date *
            </label>
            <input
              type='date'
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
              min={getMinBookingDate()}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                errors.date ? 'border-red-500' : 'border-white/10'
              } text-white focus:outline-none focus:border-amber-300/50 transition-colors`}
            />
            {errors.date && (
              <p className='text-red-400 text-xs mt-2 flex items-center gap-1'>
                <AlertTriangle className='w-3 h-3' />
                {errors.date}
              </p>
            )}
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className='flex items-center text-sm font-medium text-white/70 mb-2'>
              <Clock className='w-4 h-4 mr-2 text-amber-400' />
              Pickup Time *
            </label>
            <div className='border border-white/10 rounded-xl overflow-hidden'>
              <button
                type='button'
                onClick={() => setIsTimeSlotOpen(!isTimeSlotOpen)}
                className='w-full px-4 py-3 bg-white/5 hover:bg-white/[0.08] transition flex items-center justify-between'
              >
                <div className='text-left'>
                  <div className='text-sm text-white'>
                    {TIME_SLOTS.find((s) => s.value === formData.timeSlot)
                      ?.label ?? 'Select pickup time'}
                  </div>
                  <div className='text-xs text-white/40 mt-0.5'>
                    Experience starts 1 hour after pickup
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white/40 transition-transform duration-300 ${
                    isTimeSlotOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isTimeSlotOpen && (
                <div className='p-3 border-t border-white/5'>
                  <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.value}
                        type='button'
                        onClick={() => {
                          updateField('timeSlot', slot.value);
                          setIsTimeSlotOpen(false);
                        }}
                        className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          formData.timeSlot === slot.value
                            ? 'border-amber-500/50 bg-amber-500/15 text-amber-300'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-amber-500/30 hover:text-white/80'
                        }`}
                      >
                        <div className='flex items-center justify-center gap-1.5'>
                          {formData.timeSlot === slot.value && (
                            <CheckCircle className='w-3.5 h-3.5' />
                          )}
                          {slot.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {errors.timeSlot && (
              <p className='text-red-400 text-xs mt-2 flex items-center gap-1'>
                <AlertTriangle className='w-3 h-3' />
                {errors.timeSlot}
              </p>
            )}
          </div>

          {/* Participants */}
          <div>
            <label className='flex items-center text-sm font-medium text-white/70 mb-3'>
              <Users className='w-4 h-4 mr-2 text-amber-400' />
              Participants *
            </label>
            <div className='border border-white/10 rounded-xl p-4 bg-white/5'>
              <ParticipantCounter
                label='Adult'
                sublabel={`Above 11 years · $${PRICING.adult}`}
                value={formData.adults}
                onIncrement={() => updateField('adults', formData.adults + 1)}
                onDecrement={() =>
                  formData.adults > 1 &&
                  updateField('adults', formData.adults - 1)
                }
                icon={User}
                min={1}
              />
              <ParticipantCounter
                label='Child'
                sublabel={`5 - 10 years · $${PRICING.child.toFixed(2)} (50% off)`}
                value={formData.children}
                onIncrement={() =>
                  updateField('children', formData.children + 1)
                }
                onDecrement={() =>
                  formData.children > 0 &&
                  updateField('children', formData.children - 1)
                }
                icon={Users}
              />
              <ParticipantCounter
                label='Infant'
                sublabel='Under 5 years · Free'
                value={formData.infants}
                onIncrement={() => updateField('infants', formData.infants + 1)}
                onDecrement={() =>
                  formData.infants > 0 &&
                  updateField('infants', formData.infants - 1)
                }
                icon={Baby}
              />
            </div>
            {errors.participants && (
              <p className='text-red-400 text-xs mt-2 flex items-center gap-1'>
                <AlertTriangle className='w-3 h-3' />
                {errors.participants}
              </p>
            )}
          </div>

          {/* Price Summary */}
          <PriceSummary formData={formData} pricing={pricing} />

          {/* Transport line */}
          {promoApplied && (
            <div className='flex justify-between text-sm'>
              <span className='flex items-center gap-2 text-white/60'>
                <Truck className='w-3.5 h-3.5' />
                Pickup Transport
              </span>
              {isPromoEligible ? (
                <span className='flex items-center gap-2'>
                  <span className='text-white/30 line-through'>
                    ${TRANSPORT_VALUE}
                  </span>
                  <span className='text-emerald-400 font-medium'>FREE</span>
                </span>
              ) : (
                <span className='text-white/40'>${TRANSPORT_VALUE}</span>
              )}
            </div>
          )}

          {/* Total */}
          <div className='flex justify-between items-center pt-4 border-t border-white/10'>
            <span className='text-white/60 text-sm uppercase tracking-wide'>
              Total
            </span>
            <div className='flex items-baseline gap-3'>
              {isPromoEligible && (
                <span className='text-sm text-emerald-400 font-light'>
                  You save ${TRANSPORT_VALUE}
                </span>
              )}
              <span className='text-3xl font-light text-white'>
                ${pricing.total.toFixed(2)}
              </span>
            </div>
          </div>

          {errors.submit && (
            <div className='p-3 bg-red-500/10 border border-red-500/20 rounded-xl'>
              <p className='text-red-400 text-sm flex items-center gap-2'>
                <AlertTriangle className='w-4 h-4' />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className='flex flex-col sm:flex-row gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='flex-1 px-6 py-3 border border-white/20 rounded-xl text-white/70 hover:text-white hover:border-white/30 transition font-medium disabled:opacity-50'
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={isSubmitting}
              className='flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 font-medium shadow-lg hover:shadow-xl'
            >
              {isSubmitting ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <CreditCard className='w-4 h-4' />
              )}
              {isSubmitting ? 'Redirecting...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
