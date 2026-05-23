'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  User,
  Baby,
  AlertTriangle,
  CreditCard,
} from 'lucide-react';
import { BookingFormData, FormErrors } from '@/types';
import { PRICING, SCHEDULE } from '@/constants';
import { calculatePricing, getMinBookingDate } from '@/utils/pricing';
import ParticipantCounter from '@/components/ui/ParticipantCounter';
import PriceSummary from './PriceSummary';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    date: '',
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pricing = useMemo(() => calculatePricing(formData), [formData]);

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

    try {
      // Build WhatsApp or email inquiry with booking details
      const message = encodeURIComponent(
        `Hello! I'd like to book the Sunset Horseback Riding Experience.\n\n` +
          `Date: ${formData.date}\n` +
          `Adults: ${formData.adults}\n` +
          `Children: ${formData.children}\n` +
          `Infants: ${formData.infants}\n` +
          `Total: $${pricing.total.toFixed(2)}\n\n` +
          `Please confirm availability.`,
      );

      window.location.href = `mailto:info@luxpuntacana.com?subject=Sunset Ride Booking - ${formData.date}&body=${message}`;
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit booking. Please try again.' });
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
              <p className='text-amber-100 text-xs font-light mt-1'>
                📍 Pickup: {SCHEDULE.pickupLabel} | Experience:{' '}
                {SCHEDULE.startLabel}
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

          {/* Fixed time info */}
          <div className='border border-amber-500/20 rounded-xl p-4 bg-amber-500/5'>
            <div className='flex items-start gap-3'>
              <Clock className='w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5' />
              <div>
                <div className='text-sm font-medium text-white mb-1'>
                  Pickup Time: {SCHEDULE.pickupLabel}
                </div>
                <div className='text-xs text-white/60'>
                  Experience starts at {SCHEDULE.startLabel} for the perfect
                  sunset
                </div>
              </div>
            </div>
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

          {/* Total */}
          <div className='flex justify-between items-center pt-4 border-t border-white/10'>
            <span className='text-white/60 text-sm uppercase tracking-wide'>
              Total
            </span>
            <span className='text-3xl font-light text-white'>
              ${pricing.total.toFixed(2)}
            </span>
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
              <CreditCard className='w-4 h-4' />
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
