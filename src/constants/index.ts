import { Heart, Star, Award, Users } from 'lucide-react';
import { MediaItem, StatItem, ExperienceStep } from '@/src/types';

// ==================== PRICING ====================
export const PRICING = {
  adult: 75,
  childRate: 0.5, // 50% of adult
  infant: 0,
  processingFeeRate: 5, // 5%
  get child() {
    return this.adult * this.childRate;
  },
} as const;

// ==================== SCHEDULE ====================
export const SCHEDULE = {
  pickupTime: '16:00',
  startTime: '17:00',
  durationHours: 3,
  pickupLabel: '4:00 PM',
  startLabel: '5:00 PM',
} as const;

// ==================== GALLERY ====================
export const GALLERY_VIDEOS: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail:
      'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946814/Imagen_de_WhatsApp_2024-06-03_a_las_15.47.17_f9b60a74_l7xtfu.jpg',
    title: 'The Golden Moment',
  },
  {
    id: 2,
    type: 'video',
    src: 'https://www.w3schools.com/html/movie.mp4',
    thumbnail:
      'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946813/Imagen_de_WhatsApp_2024-06-03_a_las_15.47.17_45e97ed7_uoutrp.jpg',
    title: 'Beach Paradise',
  },
  {
    id: 3,
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail:
      'https://puntacanaexcursions.online/wp-content/uploads/2024/08/image00011-1536x1017.jpeg',
    title: 'Sunset Journey',
  },
];

export const GALLERY_IMAGES: MediaItem[] = [
  {
    id: 4,
    type: 'image',
    src: 'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946811/image00043_s1jla3.jpg',
    title: 'Golden Hour',
  },
  {
    id: 5,
    type: 'image',
    src: 'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946864/image00002_krjl52.jpg',
    title: 'Beach Sunset',
  },
  {
    id: 6,
    type: 'image',
    src: 'https://puntacanaexcursions.online/wp-content/uploads/2024/07/image00014-scaled.jpeg',
    title: 'Paradise View',
  },
];

// ==================== STATS ====================
export const STATS: StatItem[] = [
  { number: '500+', label: 'Happy Guests', icon: Heart },
  { number: '5.0', label: 'Perfect Rating', icon: Star },
  { number: '100%', label: 'Satisfaction', icon: Award },
  { number: '25+', label: 'Group Size', icon: Users },
];

// ==================== EXPERIENCE STEPS ====================
export const EXPERIENCE_STEPS: ExperienceStep[] = [
  {
    number: '01',
    title: 'Arrival',
    desc: 'VIP welcome with tropical refreshments',
  },
  {
    number: '02',
    title: 'Journey',
    desc: 'Guided ride through pristine trails',
  },
  {
    number: '03',
    title: 'Golden Hour',
    desc: "Witness nature's masterpiece unfold",
  },
  {
    number: '04',
    title: 'Serenity',
    desc: 'Pause at the shore as waves meet hooves',
  },
  {
    number: '05',
    title: 'Reflection',
    desc: 'Treasured moments under painted skies',
  },
];

// ==================== IMAGES ====================
export const HERO_IMAGE =
  'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946814/Imagen_de_WhatsApp_2024-06-03_a_las_15.47.17_f9b60a74_l7xtfu.jpg';

export const EXPERIENCE_BG =
  'https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1920';

export const CTA_IMAGE =
  'https://puntacanaexcursions.online/wp-content/uploads/2024/07/image00014-scaled.jpeg';

// ==================== CONTACT ====================
export const CONTACT_EMAIL = 'info@luxpuntacana.com';
export const CONTACT_SUBJECT = 'Horseback Riding Inquiry';
export const CONTACT_BODY =
  'Hello, I would like to know more about the sunset horseback riding experience.';
