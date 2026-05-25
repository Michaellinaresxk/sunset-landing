import { Heart, Star, Award, Users } from 'lucide-react';
import {
  MediaItem,
  StatItem,
  ExperienceStep,
  ExperienceType,
} from '@/src/types';

// ==================== PRICING ====================

export const PRICING = {
  classic: {
    adult: 65,
    child: 55,
    label: 'Classic Ride',
  },
  sunset: {
    adult: 75,
    child: 65,
    label: 'Sunset Experience',
  },
  processingFeeRate: 5,
} as const;

// ==================== SCHEDULE ====================
export const SCHEDULE = {
  pickupTime: '16:00',
  startTime: '17:00',
  durationHours: 2,
  pickupLabel: '4:00 PM',
  startLabel: '5:00 PM',
} as const;

// ==================== TIME SLOTS ====================
export const TIME_SLOTS: Record<
  ExperienceType,
  { value: string; label: string }[]
> = {
  classic: Array.from({ length: 7 }, (_, i) => {
    const hour = 9 + i; // 9 AM → 4 PM
    const hour12 = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return { value: `${hour}:00`, label: `${hour12}:00 ${ampm}` };
  }),
  sunset: [
    { value: '16:00', label: '4:00 PM' },
    { value: '16:30', label: '4:30 PM' },
  ],
};

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
    src: 'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946813/Imagen_de_WhatsApp_2024-06-03_a_las_15.47.17_45e97ed7_uoutrp.jpg',
    title: 'Beach Sunset',
  },
  {
    id: 8,
    type: 'image',
    src: 'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946864/image00002_krjl52.jpg',
    title: 'Beach Sunset',
  },
  {
    id: 7,
    type: 'image',
    src: 'https://puntacanaexcursions.online/wp-content/uploads/2024/08/image00011-1536x1017.jpeg',
    title: 'Beach Sunset',
  },
  {
    id: 6,
    type: 'image',
    src: 'https://puntacanaexcursions.online/wp-content/uploads/2024/07/image00014-scaled.jpeg',
    title: 'Paradise View',
  },

  {
    id: 3,
    type: 'image',
    src: 'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946814/Imagen_de_WhatsApp_2024-06-03_a_las_15.47.17_f9b60a74_l7xtfu.jpg',
    title: 'Paradise View',
  },
];

// ==================== PICKUP LOCATIONS ====================
export const PICKUP_LOCATIONS = [
  'Bávaro, Punta Cana',
  'Bávaro Beach',
  'Breathless Punta Cana Resort & Spa',
  'Catalonia Bávaro Beach, Golf & Casino Resort',
  'Dreams Palm Beach Punta Cana',
  'Excellence El Carmen',
  'Punta Cana Village',
  'Hotel Barceló Bávaro Palace',
  'Riu Palace Punta Cana',
  'Uvero Alto',
  'Cap Cana',
  'Hard Rock Hotel & Casino',
  'Dreams Punta Cana',
  'Iberostar Grand Bávaro',
  'Meliá Caribe Beach',
  'Paradisus Palma Real',
  'Punta Cana Resort & Club',
  'The Westin Puntacana Resort & Club',
  'Zoëtry Agua Punta Cana',
  'Bahia Principe Grand Punta Cana',
  'Catalonia Royal Bavaro',
  'Excellence Punta Cana',
  'Grand Palladium Punta Cana Resort & Spa',
  'Hotel Riu Palace Macao',
  'Hotel Riu Palace Bavaro',
  'Hotel Riu Palace Punta Cana',
  'Majestic Elegance Punta Cana',
  'Ocean Blue & Sand',
  'Riu Palace Macao',
  'VIK Hotel Arena Blanca',
] as const;

// ==================== STATS ====================
export const STATS: StatItem[] = [
  { number: '500+', label: 'Happy Guests', icon: Heart },
  { number: '4.8', label: 'Rating', icon: Star },
  { number: '100%', label: 'Satisfaction', icon: Award },
  { number: '25+', label: 'Group Size', icon: Users },
];

// ==================== EXPERIENCE STEPS ====================
export const EXPERIENCE_STEPS: ExperienceStep[] = [
  {
    number: '01',
    title: 'Welcome',
    desc: 'Unforgettable journey with a premium riding experience!',
  },
  {
    number: '02',
    title: 'Safety Briefing',
    desc: 'Receive essential instructions before hitting the scenic trails.',
  },
  {
    number: '03',
    title: 'No Experience Required',
    desc: 'Our expert guide ensures safe and enjoyable ride for all skill levels.',
  },
  {
    number: '04',
    title: 'Serenity',
    desc: 'Pause at the shore as gentle ocean waves meet the horses',
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
