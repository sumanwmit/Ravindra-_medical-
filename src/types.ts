export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  fullDetails: string;
  benefits: string[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  itemCount: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'store' | 'medicines' | 'equipment' | 'team';
  imageUrl: string;
  description: string;
}

export interface MedicineProduct {
  id: string;
  name: string;
  category: string;
  type: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Equipment' | 'Supplements' | 'Device' | 'Ointment';
  description: string;
  requiresPrescription: boolean;
  brand: string;
}
