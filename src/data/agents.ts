export interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  propertiesCount: number;
  experienceYears: number;
  avatar: string;
  rating: number;
  languages: string[];
}

export const agentsData: Agent[] = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Senior Property Consultant',
    specialization: 'Luxury Residential & Villas',
    bio: 'Specializing in prime residential sectors across Islamabad and Abbottabad with over a decade of portfolio curation expertise.',
    email: 'daniel.morgan@propertyhub.demo',
    phone: '+92 300 1122334',
    location: 'Islamabad, Pakistan',
    propertiesCount: 18,
    experienceYears: 11,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    languages: ['English', 'Urdu'],
  },
  {
    id: 'sarah-bennett',
    name: 'Sarah Bennett',
    role: 'Residential Property Advisor',
    specialization: 'Modern Apartments & Penthouses',
    bio: 'Passionate about urban architectural living, assisting clients in finding light-filled city suites and boutique family flats in Lahore.',
    email: 'sarah.bennett@propertyhub.demo',
    phone: '+92 300 2233445',
    location: 'Lahore, Pakistan',
    propertiesCount: 14,
    experienceYears: 8,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    languages: ['English', 'Urdu', 'Punjabi'],
  },
  {
    id: 'ethan-brooks',
    name: 'Ethan Brooks',
    role: 'Commercial Property Specialist',
    specialization: 'Corporate Offices & Retail Plazas',
    bio: 'Focused on high-yield corporate headquarters, commercial towers, and mixed-use investment assets in central Karachi business hubs.',
    email: 'ethan.brooks@propertyhub.demo',
    phone: '+92 300 3344556',
    location: 'Karachi, Pakistan',
    propertiesCount: 22,
    experienceYears: 14,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5.0,
    languages: ['English', 'Urdu'],
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Consultant',
    specialization: 'Bespoke Estates & Hillside Retreats',
    bio: 'Dedicated to exclusive architectural homes, scenic hill country properties, and master-planned sustainable communities.',
    email: 'olivia.carter@propertyhub.demo',
    phone: '+92 300 4455667',
    location: 'Islamabad & Rawalpindi',
    propertiesCount: 16,
    experienceYears: 9,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    languages: ['English', 'Urdu', 'French'],
  },
  {
    id: 'zainab-tariq',
    name: 'Zainab Tariq',
    role: 'Investment & Land Advisor',
    specialization: 'Gated Sector Plots & Development Sites',
    bio: 'Providing data-backed insights on land valuation, zoning requirements, and development timelines across fast-growing corridors.',
    email: 'zainab.tariq@propertyhub.demo',
    phone: '+92 300 5566778',
    location: 'Rawalpindi, Pakistan',
    propertiesCount: 11,
    experienceYears: 7,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    languages: ['English', 'Urdu'],
  },
  {
    id: 'hamza-ali',
    name: 'Hamza Ali',
    role: 'Leasing & Rental Director',
    specialization: 'Executive Rentals & Short Leases',
    bio: 'Streamlining high-profile residential rentals and corporate expat relocations with transparent contracts and concierge service.',
    email: 'hamza.ali@propertyhub.demo',
    phone: '+92 300 6677889',
    location: 'Islamabad, Pakistan',
    propertiesCount: 19,
    experienceYears: 10,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    languages: ['English', 'Urdu', 'Arabic'],
  },
];
