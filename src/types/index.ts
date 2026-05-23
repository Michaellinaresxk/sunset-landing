// ==================== MEDIA ====================
export interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  title: string;
}

export type ExperienceType = 'classic' | 'sunset';

// ==================== BOOKING ====================
export interface BookingFormData {
  experience: ExperienceType;
  date: string;
  timeSlot: string;
  adults: number;
  children: number;
  pickupLocation: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface PricingBreakdown {
  basePrice: number;
  subtotal: number;
  processingFee: number;
  total: number;
  totalParticipants: number;
}

// ==================== COMPONENTS ====================
export interface SectionProps {
  onBookClick: () => void;
}

export interface StatItem {
  number: string;
  label: string;
  icon: React.ElementType;
}

export interface ExperienceStep {
  number: string;
  title: string;
  desc: string;
}
