// ==================== MEDIA ====================
export interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  title: string;
}

// ==================== BOOKING ====================
export interface BookingFormData {
  date: string;
  adults: number;
  children: number;
  infants: number;
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
