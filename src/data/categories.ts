export interface PropertyCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  countText: string;
  iconName: string;
  image: string;
}

export const propertyCategories: PropertyCategory[] = [
  {
    id: 'houses',
    name: 'Houses & Homes',
    slug: 'house',
    description: 'Contemporary standalone residences, architectural family homes, and quiet suburban retreats.',
    countText: '42+ Available',
    iconName: 'Home',
    image: '/images/prop_cedar_residence_1790454719011.jpg',
  },
  {
    id: 'apartments',
    name: 'Apartments & Penthouses',
    slug: 'apartment',
    description: 'High-rise skyline suites, boutique urban flats, and modern metropolitan penthouses.',
    countText: '38+ Available',
    iconName: 'Building2',
    image: '/images/prop_skyline_apartment_1790454732612.jpg',
  },
  {
    id: 'villas',
    name: 'Luxury Villas',
    slug: 'villa',
    description: 'Sprawling estates, private pool residences, and architect-designed luxury compounds.',
    countText: '19+ Available',
    iconName: 'Castle',
    image: '/images/prop_emerald_villa_1790454745096.jpg',
  },
  {
    id: 'offices',
    name: 'Corporate Offices',
    slug: 'office',
    description: 'Turnkey business centers, executive suites, and collaborative corporate spaces.',
    countText: '24+ Available',
    iconName: 'Briefcase',
    image: '/images/prop_urban_office_1790454758204.jpg',
  },
  {
    id: 'commercial',
    name: 'Commercial & Retail',
    slug: 'commercial',
    description: 'Prime ground-floor retail plazas, showrooms, and mixed-use commercial properties.',
    countText: '15+ Available',
    iconName: 'Store',
    image: '/images/hero_property_banner_1790454702504.jpg',
  },
  {
    id: 'land',
    name: 'Plots & Land',
    slug: 'land',
    description: 'Residential and commercial development plots in prime gated sectors.',
    countText: '12+ Available',
    iconName: 'Trees',
    image: '/images/prop_cedar_residence_1790454719011.jpg',
  },
];
