import {
  Lightbulb, Sun, Zap, Layers, Box, Car, Map, Monitor, Scissors, Flame,
  Palette, Hammer, Wrench, Settings, Award,
} from 'lucide-react';

export const COMPANY = {
  name: 'Speedex Signages',
  tagline: 'We Light Up Your Brand',
  phone: '+971 4 000 0000',
  whatsapp: '971500000000',
  email: 'info@speedexsignages.ae',
  address: 'Al Quoz Industrial Area, Dubai, United Arab Emirates',
  mapEmbed: 'https://www.google.com/maps?q=Al+Quoz+Industrial+Area+Dubai&output=embed',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
  heroVideo: 'https://assets.mixkit.co/videos/4264/4264-720.mp4',
  heroPoster: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1920&q=80',
};

export const STATS = [
  { label: 'Years of Experience', value: 18, suffix: '+' },
  { label: 'Projects Completed', value: 2400, suffix: '+' },
  { label: 'Happy Clients', value: 950, suffix: '+' },
  { label: 'Team Members', value: 65, suffix: '+' },
];

// Process / core services from the uploaded "Our Services" document
export const PROCESS = [
  { icon: Palette, title: 'Concept & Design', desc: 'We work with you to determine the right type, size, material, and design for your sign based on your goals, brand and location.' },
  { icon: Hammer, title: 'Fabrication & Printing', desc: 'Producing the physical sign, banner or graphic using vinyl, metal, acrylic, foam and digital screens.' },
  { icon: Settings, title: 'Installation', desc: 'Professional mounting and installation of exterior, interior and electrical signage including permits and compliance.' },
  { icon: Wrench, title: 'Maintenance & Repair', desc: 'Ongoing service to keep your signs clean, bright, illuminated and in great working order.' },
  { icon: Monitor, title: 'Digital Signage Solutions', desc: 'Setting up and managing digital screens, kiosks and interactive displays.' },
];

export const SERVICES = [
  { icon: Box, title: 'Indoor Signage', desc: 'Reception walls, wayfinding plaques, room IDs, brand walls and acrylic interior fit-outs.', img: 'https://images.unsplash.com/photo-1606327054629-64c8b0fd6e4f?w=900&q=80' },
  { icon: Sun, title: 'Outdoor Signage', desc: 'Building façades, pylons, light boxes, billboards and flag poles engineered for UAE climate.', img: 'https://images.unsplash.com/photo-1604754742629-3e0498f64e7d?w=900&q=80' },
  { icon: Lightbulb, title: 'LED Signage', desc: 'Front-lit, back-lit and side-lit illuminated channel letters with energy-efficient LED.', img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=80' },
  { icon: Layers, title: 'Acrylic Signage', desc: 'Premium acrylic letters, light boxes and layered logos with polished or matte finishes.', img: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=900&q=80' },
  { icon: Award, title: '3D Letter Signage', desc: 'Chaneleum, brushed stainless steel, brass and aluminium moulded 3D letters.', img: 'https://images.unsplash.com/photo-1492551557933-34265f7af79e?w=900&q=80' },
  { icon: Car, title: 'Vehicle Branding', desc: 'Full vehicle wraps, partial branding and fleet livery for cars, trucks and vans.', img: 'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=900&q=80' },
  { icon: Map, title: 'Wayfinding Signage', desc: 'Name & floor directories, room plaques and hanging directional signs in metal & acrylic.', img: 'https://images.unsplash.com/photo-1573164574230-9a64b04b4d56?w=900&q=80' },
  { icon: Monitor, title: 'Digital Signage', desc: 'Indoor & outdoor LED video walls, menu boards, kiosks and interactive displays.', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80' },
  { icon: Scissors, title: 'CNC Cutting', desc: 'Precision CNC routing for acrylic, ACP, MDF, foam and metals up to large formats.', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80' },
  { icon: Flame, title: 'Laser Cutting', desc: 'Sharp laser cutting and engraving for metals, acrylics and signage components.', img: 'https://images.unsplash.com/photo-1581091215367-59ab6f4f6f0c?w=900&q=80' },
];

export type Project = { id: string; title: string; category: string; img: string; year: number; client: string; description: string };

export const PROJECT_CATEGORIES = ['All', 'LED Signage', 'Retail', 'Corporate', 'Outdoor', 'Vehicle', 'Wayfinding'];

export const PROJECTS: Project[] = [
  { id: 'p1', title: 'Marina Tower 3D Lit Letters', category: 'LED Signage', img: 'https://images.unsplash.com/photo-1556139943-4bdca53adf1e?w=1200&q=80', year: 2025, client: 'Marina Holdings', description: 'Front-lit chaneleum 3D letters with high-output LED, installed at 32 meters elevation.' },
  { id: 'p2', title: 'Boutique Mall Wayfinding', category: 'Wayfinding', img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&q=80', year: 2025, client: 'Boutique Mall DXB', description: 'Bilingual directory and floor signage in brushed aluminium and acrylic.' },
  { id: 'p3', title: 'Premium SUV Wrap', category: 'Vehicle', img: 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=1200&q=80', year: 2024, client: 'Private Client', description: 'Full satin metallic vinyl wrap with custom graphics.' },
  { id: 'p4', title: 'Corporate HQ Reception', category: 'Corporate', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', year: 2025, client: 'Sapphire Group', description: 'Backlit acrylic logo wall with brushed stainless steel sub-text.' },
  { id: 'p5', title: 'Pylon Sign — Sheikh Zayed Rd', category: 'Outdoor', img: 'https://images.unsplash.com/photo-1517242810446-cc8951b2be40?w=1200&q=80', year: 2024, client: 'Auto Plaza', description: '14m double-sided illuminated pylon with steel framework.' },
  { id: 'p6', title: 'Café Neon Storefront', category: 'Retail', img: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=1200&q=80', year: 2025, client: 'Bean Co.', description: 'LED neon flex signage with acrylic backer.' },
  { id: 'p7', title: 'Showroom LED Video Wall', category: 'LED Signage', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', year: 2025, client: 'Lux Motors', description: '3.5m × 2m P2.5 indoor video wall with content management.' },
  { id: 'p8', title: 'Restaurant Façade', category: 'Outdoor', img: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80', year: 2024, client: 'Saffron Kitchen', description: 'Weatherproof illuminated façade with custom 3D logo.' },
];

export type Product = { id: string; name: string; category: string; img: string; desc: string };

export const PRODUCT_CATEGORIES = ['All', 'LED Signs', 'Acrylic Letters', 'Neon Signs', 'Reception Signs', 'Safety Signs', 'Pylon Signs', 'Directional Signs', '3D Letters'];

export const PRODUCTS: Product[] = [
  { id: 'led-channel', name: 'LED Channel Letters', category: 'LED Signs', img: 'https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=900&q=80', desc: 'Front-lit and back-lit illuminated channel letters for exterior branding.' },
  { id: 'acrylic-3d', name: 'Acrylic 3D Letters', category: 'Acrylic Letters', img: 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?w=900&q=80', desc: 'Premium polished or matte acrylic letters in any thickness or finish.' },
  { id: 'neon-led', name: 'LED Neon Sign', category: 'Neon Signs', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80', desc: 'Custom LED neon flex signs — safer and more efficient than traditional neon.' },
  { id: 'reception-logo', name: 'Reception Logo Wall', category: 'Reception Signs', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80', desc: '3D letters in acrylic, brushed aluminium or stainless steel for receptions.' },
  { id: 'exit-sign', name: 'Emergency Exit Sign', category: 'Safety Signs', img: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=900&q=80', desc: 'UAE civil-defense compliant illuminated exit and safety signage.' },
  { id: 'pylon', name: 'Illuminated Pylon Sign', category: 'Pylon Signs', img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=900&q=80', desc: 'Free-standing illuminated pylons engineered to UAE wind-load standards.' },
  { id: 'wayfinding', name: 'Wayfinding Plaque', category: 'Directional Signs', img: 'https://images.unsplash.com/photo-1604147706284-91c7f76e1aaf?w=900&q=80', desc: 'Acrylic or brushed metal plaques for floors, rooms and directories.' },
  { id: 'stainless-3d', name: 'Stainless Steel 3D Letters', category: '3D Letters', img: 'https://images.unsplash.com/photo-1498409785966-ab341407de6e?w=900&q=80', desc: 'Hand-finished brushed or mirror-polished stainless steel 3D letters.' },
  { id: 'led-lightbox', name: 'LED Light Box', category: 'LED Signs', img: 'https://images.unsplash.com/photo-1559070100-a5ad04eaab48?w=900&q=80', desc: 'Slim aluminum frame light boxes with edge-lit LED panels.' },
  { id: 'flex-banner', name: 'Flex Face Light Box', category: 'LED Signs', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=80', desc: 'Tensioned flex face illuminated boxes for large-format façades.' },
];

export const TESTIMONIALS = [
  { name: 'Ahmed Al Mansouri', role: 'CEO, Sapphire Group', text: 'Speedex delivered our HQ signage two weeks ahead of schedule with flawless craftsmanship.', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' },
  { name: 'Priya Nair', role: 'Marketing Head, Boutique Mall', text: 'From design to install they were a true partner. The wayfinding is gorgeous and clear.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'James Carter', role: 'GM, Lux Motors', text: 'The LED video wall transformed our showroom. Strong project management throughout.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { name: 'Fatima Hassan', role: 'Founder, Bean Co.', text: 'They captured our brand exactly. Customers comment on the neon every single day.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
];

export const CLIENTS = [
  'Emirates', 'Etisalat', 'Emaar', 'Aldar', 'DAMAC', 'Majid Al Futtaim', 'Chalhoub', 'Lulu',
];

export const FAQ = [
  { q: 'How long does a typical signage project take?', a: 'Most standard projects are delivered within 2–4 weeks from approval — from design and permits to fabrication and installation.' },
  { q: 'Do you handle municipality and DM permits?', a: 'Yes. We manage permits and compliance for Dubai Municipality, Trakhees, Abu Dhabi DMT and most free zones.' },
  { q: 'Can you install signs at height?', a: 'Yes. Our certified rope-access and MEWP teams safely install façade signage at any elevation.' },
  { q: 'Do you offer maintenance contracts?', a: 'We offer annual maintenance contracts covering cleaning, LED replacement and structural inspection.' },
  { q: 'Which materials do you fabricate in-house?', a: 'Acrylic, aluminium, stainless steel, brass, ACP, flex, vinyl and Chaneleum — all in our Al Quoz facility.' },
];

export const TIMELINE = [
  { year: '2007', text: 'Founded in Dubai as a small fabrication workshop.' },
  { year: '2012', text: 'Expanded to a 2,000 m² facility in Al Quoz Industrial.' },
  { year: '2016', text: 'Added in-house CNC routing and laser cutting.' },
  { year: '2019', text: '1,000th project delivered across the UAE.' },
  { year: '2022', text: 'Launched Digital Signage and LED video wall division.' },
  { year: '2025', text: 'Trusted partner to 950+ brands across the GCC.' },
];

export const JOBS = [
  { title: 'Signage Designer', dept: 'Design', type: 'Full-time', location: 'Dubai' },
  { title: 'CNC Operator', dept: 'Production', type: 'Full-time', location: 'Dubai' },
  { title: 'Installation Technician', dept: 'Field Operations', type: 'Full-time', location: 'UAE-wide' },
  { title: 'Project Manager', dept: 'Projects', type: 'Full-time', location: 'Dubai' },
  { title: 'Sales Executive', dept: 'Sales', type: 'Full-time', location: 'Dubai / Abu Dhabi' },
];

export const BENEFITS = [
  'Competitive salary + project bonuses',
  'Medical insurance for you and family',
  'Annual paid leave and air tickets',
  'Training & certification support',
  'Modern facility with the latest equipment',
  'Collaborative, multicultural team',
];