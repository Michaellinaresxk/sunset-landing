'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  User,
  MapPin,
  AlertTriangle,
  CreditCard,
  Loader2,
  Truck,
  Check,
  CheckCircle,
  ChevronDown,
  Sun,
  Sunrise,
} from 'lucide-react';
import { BookingFormData, FormErrors, ExperienceType } from '@/src/types';
import { PRICING, TIME_SLOTS } from '@/src/constants';
import { calculatePricing } from '@/src/utils/pricing';
import ParticipantCounter from '@/src/components/ui/ParticipantCounter';
import PriceSummary from './PriceSummary';
import PickupLocationInput from '@/src/components/PickupLocationInput';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getMinBookingDate = (): string => new Date().toISOString().split('T')[0];

const EXPERIENCE_OPTIONS: {
  type: ExperienceType;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  price: number;
  badge?: string;
}[] = [
  {
    type: 'classic',
    icon: Sunrise,
    title: 'Classic Ride',
    subtitle: 'Flexible hours · Beach & trail',
    price: PRICING.classic.adult,
  },
  {
    type: 'sunset',
    icon: Sun,
    title: 'Sunset Experience',
    subtitle: 'Golden hour · Premium',
    price: PRICING.sunset.adult,
    badge: 'Popular',
  },
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    experience: 'sunset',
    date: '',
    timeSlot: '',
    adults: 1,
    children: 0,
    pickupLocation: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimeSlotOpen, setIsTimeSlotOpen] = useState(false);

  const pricing = useMemo(() => calculatePricing(formData), [formData]);
  const tier = PRICING[formData.experience];
  const availableSlots = TIME_SLOTS[formData.experience];

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

  const handleExperienceChange = useCallback((type: ExperienceType) => {
    setFormData((prev) => ({
      ...prev,
      experience: type,
      timeSlot: '',
    }));
    setIsTimeSlotOpen(false);
  }, []);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Pickup time is required';
    if (!formData.pickupLocation.trim())
      newErrors.pickupLocation = 'Pickup location is required';
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
        body: JSON.stringify({ formData }),
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
    <div className='fixed inset-0 bg-black/98 z-50 overflow-y-auto backdrop-blur-2xl animate-fadeIn'>
      <div className='min-h-full flex items-center justify-center p-4'>
        <div className='bg-zinc-900 rounded-3xl max-w-2xl w-full border border-white/10 my-8'>
          {/* Header */}
          <div className='bg-gradient-to-r from-amber-500 to-orange-500 px-6 md:px-8 py-6 rounded-t-3xl'>
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='text-2xl md:text-3xl font-light text-white mb-2 tracking-tight'>
                  Book Your Experience
                </h3>
                <p className='text-amber-50 text-sm font-light'>
                  Horseback Riding — Punta Cana
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
            {/* Experience Selector */}
            <div>
              <label className='text-sm font-medium text-white/70 mb-3 block'>
                Choose Your Experience
              </label>
              <div className='grid grid-cols-2 gap-3'>
                {EXPERIENCE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = formData.experience === opt.type;
                  return (
                    <button
                      key={opt.type}
                      type='button'
                      onClick={() => handleExperienceChange(opt.type)}
                      className={`relative text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-amber-500/60 bg-amber-500/10'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                      }`}
                    >
                      {opt.badge && (
                        <span className='absolute -top-2.5 right-3 px-2 py-0.5 bg-amber-500 text-[10px] font-semibold text-white rounded-full'>
                          {opt.badge}
                        </span>
                      )}
                      <div className='flex items-center gap-2 mb-2'>
                        <Icon
                          className={`w-4 h-4 ${
                            isSelected ? 'text-amber-400' : 'text-white/40'
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? 'text-white' : 'text-white/60'
                          }`}
                        >
                          {opt.title}
                        </span>
                      </div>
                      <p className='text-[11px] text-white/40 leading-snug mb-2'>
                        {opt.subtitle}
                      </p>
                      <p
                        className={`text-lg font-light ${
                          isSelected ? 'text-amber-300' : 'text-white/50'
                        }`}
                      >
                        ${opt.price}
                        <span className='text-[11px] text-white/30 ml-1'>
                          /person
                        </span>
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transport Included — single clear message, no promo game */}
            <div className='rounded-xl p-4 border bg-emerald-500/[0.06] border-emerald-500/15'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0'>
                  <Truck className='w-5 h-5 text-emerald-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='text-sm font-medium text-emerald-300'>
                    Hotel Pickup & Drop-off Included
                  </div>
                  <div className='text-xs text-white/40 mt-0.5'>
                    We pick you up from your hotel and bring you back — no extra
                    charge
                  </div>
                </div>
                <div className='text-sm font-medium text-emerald-400 flex-shrink-0'>
                  FREE
                </div>
              </div>
            </div>

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
              <div
                className={`border rounded-xl overflow-hidden ${
                  errors.timeSlot ? 'border-red-500' : 'border-white/10'
                }`}
              >
                <button
                  type='button'
                  onClick={() => setIsTimeSlotOpen(!isTimeSlotOpen)}
                  className='w-full px-4 py-3 bg-white/5 hover:bg-white/[0.08] transition flex items-center justify-between'
                >
                  <div className='text-left'>
                    <div className='text-sm text-white'>
                      {availableSlots.find((s) => s.value === formData.timeSlot)
                        ?.label ?? 'Select pickup time'}
                    </div>
                    <div className='text-xs text-white/40 mt-0.5'>
                      {formData.experience === 'sunset'
                        ? 'Golden hour departure'
                        : 'Choose your preferred time'}
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
                      {availableSlots.map((slot) => (
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

            {/* Pickup Location */}
            <div>
              <label className='flex items-center text-sm font-medium text-white/70 mb-2'>
                <MapPin className='w-4 h-4 mr-2 text-amber-400' />
                Pickup Location *
              </label>
              <PickupLocationInput
                value={formData.pickupLocation}
                onChange={(val) => updateField('pickupLocation', val)}
                error={errors.pickupLocation}
              />
              {errors.pickupLocation && (
                <p className='text-red-400 text-xs mt-2 flex items-center gap-1'>
                  <AlertTriangle className='w-3 h-3' />
                  {errors.pickupLocation}
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
                  sublabel={`11+ years · $${tier.adult}`}
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
                  sublabel={`7–10 years · $${tier.child}`}
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

            {/* Trust signals */}
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10'>
                <Check className='w-4 h-4 text-emerald-400 flex-shrink-0' />
                <p className='text-xs text-white/50 font-light'>
                  <span className='text-emerald-400 font-medium'>
                    Free cancellation
                  </span>{' '}
                  up to 24 hours before the experience
                </p>
              </div>
              <div className='flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10'>
                <Truck className='w-4 h-4 text-emerald-400 flex-shrink-0' />
                <p className='text-xs text-white/50 font-light'>
                  <span className='text-emerald-400 font-medium'>
                    Hotel pickup & drop-off
                  </span>{' '}
                  included at no extra charge
                </p>
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
    </div>
  );
}
