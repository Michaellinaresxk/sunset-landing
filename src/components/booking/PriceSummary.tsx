'use client';

import { PRICING } from '@/src/constants';
import { PricingBreakdown, BookingFormData } from '@/src/types';

interface PriceSummaryProps {
  formData: BookingFormData;
  pricing: PricingBreakdown;
}

export default function PriceSummary({ formData, pricing }: PriceSummaryProps) {
  const tier = PRICING[formData.experience];

  return (
    <div className='space-y-1'>
      {/* Tier label */}
      <div className='text-xs text-amber-400 font-medium mb-2'>
        {tier.label}
      </div>

      {formData.adults > 0 && (
        <div className='flex justify-between text-sm text-white/60'>
          <span>
            {formData.adults} Adult{formData.adults > 1 ? 's' : ''} × $
            {tier.adult}
          </span>
          <span className='font-medium text-white'>
            ${(formData.adults * tier.adult).toFixed(2)}
          </span>
        </div>
      )}

      {formData.children > 0 && (
        <div className='flex justify-between text-sm text-white/60'>
          <span>
            {formData.children} Child{formData.children > 1 ? 'ren' : ''} × $
            {tier.child}
          </span>
          <span className='font-medium text-white'>
            ${(formData.children * tier.child).toFixed(2)}
          </span>
        </div>
      )}

      {pricing.processingFee > 0 && (
        <div className='flex justify-between text-sm text-white/40 pt-2 border-t border-white/5 mt-2'>
          <span>Processing fee ({PRICING.processingFeeRate}%)</span>
          <span>${pricing.processingFee.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}
