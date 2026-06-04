'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
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
  Star,
  Shield,
} from 'lucide-react';
import { BookingFormData, FormErrors, ExperienceType } from '@/src/types';
import { PRICING, TIME_SLOTS } from '@/src/constants';
import { calculatePricing } from '@/src/utils/pricing';
import ParticipantCounter from '@/src/components/ui/ParticipantCounter';
import PriceSummary from '@/src/components/booking/PriceSummary';
import PickupLocationInput from '@/src/components/PickupLocationInput';

// ── Constants ─────────────────────────────────────────────────

const HERO_IMAGE =
  'https://res.cloudinary.com/ddg92xar5/image/upload/f_auto,q_auto,w_1200/v1755946814/Imagen_de_WhatsApp_2024-06-03_a_las_15.47.17_f9b60a74_l7xtfu.jpg';

const HERO_IMAGE_MOBILE =
  'https://res.cloudinary.com/ddg92xar5/image/upload/f_auto,q_auto,w_800/v1755946864/image00002_krjl52.jpg';

const TRUST_REVIEWS = [
  {
    text: 'Absolutely incredible experience. The sunset ride was magical — worth every penny.',
    author: 'Sarah M.',
    country: '🇺🇸',
    rating: 5,
  },
  {
    text: 'Pasamos un día increíble. Los niños disfrutaron muchísimo. Se nota que hacen su trabajo con pasión.',
    author: 'Anyelina G.',
    country: '🇨🇴',
    rating: 5,
  },
  {
    text: 'Best excursion in Punta Cana. Hotel pickup was on time, guides were amazing.',
    author: 'Peter O.',
    country: '🇬🇧',
    rating: 5,
  },
];

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

const getMinBookingDate = (): string => new Date().toISOString().split('T')[0];

// ── Left panel — image + social proof ─────────────────────────

function BookingLeftPanel() {
  return (
    <div className='relative hidden lg:flex flex-col h-full min-h-screen'>
      {/* Sticky image container */}
      <div className='sticky top-0 h-screen flex flex-col overflow-hidden'>
        {/* Background image */}
        <div className='absolute inset-0'>
          <img
            src={HERO_IMAGE}
            alt='Horseback riding at sunset on Playa Macao beach Punta Cana'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-zinc-950/98 via-zinc-950/60 to-zinc-950/50' />
          <div className='absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/30' />
        </div>

        {/* Content over image */}
        <div className='relative z-10 flex flex-col h-full p-8 xl:p-12'>
          {/* Back link */}
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm w-fit'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to home
          </Link>

          {/* Spacer */}
          <div className='flex-1' />

          {/* Bottom content */}
          <div className='space-y-6'>
            {/* Rating badge */}
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-3.5 h-3.5 text-amber-400 fill-amber-400'
                  />
                ))}
              </div>
              <span className='text-white text-sm font-medium'>4.8</span>
              <span className='text-white/50 text-sm'>· 500+ riders</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className='text-4xl xl:text-5xl font-extralight text-white tracking-tight leading-tight mb-3'>
                Horseback Riding
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200'>
                  Punta Cana
                </span>
              </h1>
              <p className='text-white/60 font-light text-lg leading-relaxed'>
                2-hour guided ride along Playa Macao beach at golden hour. Hotel
                pickup included.
              </p>
            </div>

            {/* Quick facts */}
            <div className='flex flex-wrap gap-2'>
              {[
                { icon: Truck, label: 'Hotel pickup free' },
                { icon: Shield, label: 'Free cancellation' },
                { icon: Calendar, label: 'Every day' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 text-xs'
                >
                  <Icon className='w-3.5 h-3.5 text-amber-400' />
                  {label}
                </span>
              ))}
            </div>

            {/* Reviews */}
            <div className='space-y-3'>
              {TRUST_REVIEWS.map((review, i) => (
                <div
                  key={i}
                  className='p-4 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/10'
                >
                  <div className='flex gap-0.5 mb-2'>
                    {[...Array(review.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className='w-3 h-3 text-amber-400 fill-amber-400'
                      />
                    ))}
                  </div>
                  <p className='text-white/70 text-sm font-light leading-relaxed mb-2'>
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <span className='text-white/40 text-xs'>
                    {review.country} {review.author}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Booking form ───────────────────────────────────────────────

function BookingForm() {
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
        if (prev[field as string]) {
          const next = { ...prev };
          delete next[field as string];
          return next;
        }
        return prev;
      });
    },
    [],
  );

  const handleExperienceChange = useCallback((type: ExperienceType) => {
    setFormData((prev) => ({ ...prev, experience: type, timeSlot: '' }));
    setIsTimeSlotOpen(false);
  }, []);

  const validateForm = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.timeSlot) errs.timeSlot = 'Pickup time is required';
    if (!formData.pickupLocation.trim())
      errs.pickupLocation = 'Pickup location is required';
    if (pricing.totalParticipants === 0)
      errs.participants = 'At least one participant is required';
    return errs;
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
      if (!response.ok) throw new Error(data.error || 'Checkout failed');

      window.location.href = data.checkoutUrl;
    } catch (error) {
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

  return (
    <div className='w-full max-w-xl mx-auto px-4 py-8 lg:py-12 space-y-6'>
      {/* Mobile back + header */}
      <div className='lg:hidden'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-6'
        >
          <ArrowLeft className='w-4 h-4' />
          Back
        </Link>
        {/* Mobile hero image strip */}
        <div className='relative h-44 rounded-2xl overflow-hidden mb-6'>
          <img
            src={HERO_IMAGE_MOBILE}
            alt='Horseback riding Punta Cana'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent' />
          <div className='absolute bottom-4 left-4'>
            <div className='flex gap-0.5 mb-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className='w-3 h-3 text-amber-400 fill-amber-400'
                />
              ))}
            </div>
            <p className='text-white text-sm font-light'>4.8 · 500+ riders</p>
          </div>
        </div>
      </div>

      {/* Section heading */}
      <div>
        <h2 className='text-2xl font-light text-white tracking-tight mb-1'>
          Reserve Your Spot
        </h2>
        <p className='text-white/40 text-sm'>
          Horseback Riding · Playa Macao, Punta Cana
        </p>
      </div>

      {/* ── Experience Selector ── */}
      <div>
        <label className='text-xs font-medium text-white/50 uppercase tracking-widest mb-3 block'>
          Choose Experience
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
                    className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-white/40'}`}
                  />
                  <span
                    className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/60'}`}
                  >
                    {opt.title}
                  </span>
                </div>
                <p className='text-[11px] text-white/40 leading-snug mb-2'>
                  {opt.subtitle}
                </p>
                <p
                  className={`text-lg font-light ${isSelected ? 'text-amber-300' : 'text-white/50'}`}
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

      {/* ── Transport included ── */}
      <div className='rounded-xl p-4 border bg-emerald-500/[0.06] border-emerald-500/15'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0'>
            <Truck className='w-4 h-4 text-emerald-400' />
          </div>
          <div className='flex-1 min-w-0'>
            <div className='text-sm font-medium text-emerald-300'>
              Hotel Pickup & Drop-off Included
            </div>
            <div className='text-xs text-white/40 mt-0.5'>
              No extra charge — we pick you up and bring you back
            </div>
          </div>
          <span className='text-sm font-semibold text-emerald-400 flex-shrink-0'>
            FREE
          </span>
        </div>
      </div>

      {/* ── Date ── */}
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

      {/* ── Time Slot ── */}
      <div>
        <label className='flex items-center text-sm font-medium text-white/70 mb-2'>
          <Clock className='w-4 h-4 mr-2 text-amber-400' />
          Pickup Time *
        </label>
        <div
          className={`border rounded-xl overflow-hidden ${errors.timeSlot ? 'border-red-500' : 'border-white/10'}`}
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
              className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isTimeSlotOpen ? 'rotate-180' : ''}`}
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

      {/* ── Pickup Location ── */}
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

      {/* ── Participants ── */}
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
              formData.adults > 1 && updateField('adults', formData.adults - 1)
            }
            icon={User}
            min={1}
          />
          <ParticipantCounter
            label='Child'
            sublabel={`7–10 years · $${tier.child}`}
            value={formData.children}
            onIncrement={() => updateField('children', formData.children + 1)}
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

      {/* ── Order Summary ── */}
      <div className='rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4'>
        <h3 className='text-sm font-medium text-white/70 uppercase tracking-widest'>
          Order Summary
        </h3>
        <PriceSummary formData={formData} pricing={pricing} />
        <div className='flex justify-between items-center pt-3 border-t border-white/10'>
          <span className='text-white/50 text-sm'>Total</span>
          <span className='text-2xl font-light text-white'>
            ${pricing.total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* ── Trust signals ── */}
      <div className='grid grid-cols-2 gap-2'>
        <div className='flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10'>
          <Check className='w-3.5 h-3.5 text-emerald-400 flex-shrink-0' />
          <p className='text-xs text-white/50'>
            <span className='text-emerald-400 font-medium block'>
              Free cancellation
            </span>
            Up to 24h before
          </p>
        </div>
        <div className='flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/5'>
          <Shield className='w-3.5 h-3.5 text-amber-400 flex-shrink-0' />
          <p className='text-xs text-white/50'>
            <span className='text-white/70 font-medium block'>
              Secure payment
            </span>
            via Stripe
          </p>
        </div>
      </div>

      {/* ── Error ── */}
      {errors.submit && (
        <div className='p-3 bg-red-500/10 border border-red-500/20 rounded-xl'>
          <p className='text-red-400 text-sm flex items-center gap-2'>
            <AlertTriangle className='w-4 h-4' />
            {errors.submit}
          </p>
        </div>
      )}

      {/* ── Submit ── */}
      <button
        type='button'
        onClick={handleSubmit}
        disabled={isSubmitting}
        className='w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 font-medium text-base shadow-lg hover:shadow-xl hover:shadow-amber-500/20'
      >
        {isSubmitting ? (
          <Loader2 className='w-5 h-5 animate-spin' />
        ) : (
          <CreditCard className='w-5 h-5' />
        )}
        {isSubmitting ? 'Redirecting to Stripe...' : 'Proceed to Payment'}
      </button>

      <p className='text-center text-white/25 text-xs pb-8'>
        You will be redirected to Stripe secure checkout
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function BookingPage() {
  return (
    <main className='min-h-screen bg-zinc-950 antialiased'>
      <div className='lg:grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[55%_45%] min-h-screen'>
        {/* Left — image + social proof (desktop only) */}
        <BookingLeftPanel />

        {/* Right — form */}
        <div className='bg-zinc-950 border-l border-white/5 overflow-y-auto'>
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
