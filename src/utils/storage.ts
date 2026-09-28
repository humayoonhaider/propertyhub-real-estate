import { Property, initialPropertiesData } from '../data/properties';

const FAVORITES_KEY = 'propertyhub_favorites';
const LISTINGS_KEY = 'propertyhub_listings';
const INQUIRIES_KEY = 'propertyhub_inquiries';

export interface InquirySubmission {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

// Favorites management
export function getFavoriteIds(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return ['cedar-residence', 'emerald-garden-villa']; // default initial favorite for demo warmth
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteId(id: string): boolean {
  try {
    const current = getFavoriteIds();
    let updated: string[];
    let added = false;
    if (current.includes(id)) {
      updated = current.filter((item) => item !== id);
      added = false;
    } else {
      updated = [...current, id];
      added = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-updated'));
    return added;
  } catch {
    return false;
  }
}

export function isFavoriteId(id: string): boolean {
  return getFavoriteIds().includes(id);
}

// User Custom Listings
export function getUserListings(): Property[] {
  try {
    const raw = localStorage.getItem(LISTINGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUserListing(property: Property): void {
  try {
    const current = getUserListings();
    const updated = [property, ...current];
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('listings-updated'));
  } catch (err) {
    console.error('Failed to save listing', err);
  }
}

export function getAllProperties(): Property[] {
  const custom = getUserListings();
  // Filter out any duplicates by id
  const customIds = new Set(custom.map((p) => p.id));
  const defaults = initialPropertiesData.filter((p) => !customIds.has(p.id));
  return [...custom, ...defaults];
}

// Inquiries
export function saveInquiry(inquiry: Omit<InquirySubmission, 'id' | 'submittedAt'>): InquirySubmission {
  const item: InquirySubmission = {
    ...inquiry,
    id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    submittedAt: new Date().toISOString(),
  };
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    const list = raw ? JSON.parse(raw) : [];
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify([item, ...list]));
  } catch (err) {
    console.error('Failed to save inquiry', err);
  }
  return item;
}

export function getInquiries(): InquirySubmission[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Formatters
export function formatPKR(num: number, purpose: 'Buy' | 'Rent' = 'Buy'): string {
  if (num >= 10000000) {
    const crore = (num / 10000000).toFixed(1).replace(/\.0$/, '');
    return `PKR ${crore} Crore${purpose === 'Rent' ? ' / mo' : ''}`;
  }
  if (num >= 100000) {
    const lakh = (num / 100000).toFixed(1).replace(/\.0$/, '');
    return `PKR ${lakh} Lakh${purpose === 'Rent' ? ' / mo' : ''}`;
  }
  return `PKR ${num.toLocaleString('en-US')}${purpose === 'Rent' ? ' / mo' : ''}`;
}

export function formatArea(sqFt: number): string {
  if (sqFt >= 4500) {
    const kanal = (sqFt / 4500).toFixed(1).replace(/\.0$/, '');
    return `${sqFt.toLocaleString('en-US')} sq ft (${kanal} Kanal)`;
  }
  if (sqFt >= 225) {
    const marla = (sqFt / 225).toFixed(1).replace(/\.0$/, '');
    return `${sqFt.toLocaleString('en-US')} sq ft (${marla} Marla)`;
  }
  return `${sqFt.toLocaleString('en-US')} sq ft`;
}
