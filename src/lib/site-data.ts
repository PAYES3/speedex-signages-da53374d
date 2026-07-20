import {
  Lightbulb, Sun, Zap, Layers, Box, Car, Map, Monitor, Scissors, Flame,
  Palette, Hammer, Wrench, Settings, Award,
} from 'lucide-react';

import heroSignage from '@/assets/hero-signage.jpg';
import sIndoor from '@/assets/services/indoor.jpg';
import sOutdoor from '@/assets/services/outdoor.jpg';
import sLed from '@/assets/services/led.jpg';
import sAcrylic from '@/assets/services/acrylic.jpg';
import s3d from '@/assets/services/3d-letters.jpg';
import sVehicle from '@/assets/services/vehicle.jpg';
import sWayfinding from '@/assets/services/wayfinding.jpg';
import sDigital from '@/assets/services/digital.jpg';
import sCnc from '@/assets/services/cnc.jpg';
import sLaser from '@/assets/services/laser.jpg';
import pLedChannel from '@/assets/products/led-channel.jpg';
import pAcrylic3d from '@/assets/products/acrylic-3d.jpg';
import pNeon from '@/assets/products/neon-led.jpg';
import pReception from '@/assets/products/reception-logo.jpg';
import pExit from '@/assets/products/exit-sign.jpg';
import pPylon from '@/assets/products/pylon.jpg';
import pWayfinding from '@/assets/products/wayfinding.jpg';
import pStainless from '@/assets/products/stainless-3d.jpg';
import pLightbox from '@/assets/products/led-lightbox.jpg';
import pFlex from '@/assets/products/flex-banner.jpg';

export const COMPANY = {
  name: 'Speedex Signages LLC',
  tagline: 'We Light Up Your Brand',
  phone: '+971 50 123 4567',
  whatsapp: '971501234567',
  email: 'speedexsignages@excellentgroup.ae',
  address: 'Al Quoz Industrial Area, Dubai, United Arab Emirates',
  mapEmbed: 'https://www.google.com/maps?q=Speedex+Auto+Workshop+L.L.C&ll=24.3564342,54.4935042&z=17&output=embed',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
  heroImage: heroSignage,
  heroVideo: 'https://cdn.coverr.co/videos/coverr-neon-sign-in-the-city-1573/1080p.mp4',
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
  { icon: Box, title: 'Indoor Signage', desc: 'Reception walls, wayfinding plaques, room IDs, brand walls and acrylic interior fit-outs.', img: sIndoor },
  { icon: Sun, title: 'Outdoor Signage', desc: 'Building façades, pylons, light boxes, billboards and flag poles engineered for UAE climate.', img: sOutdoor },
  { icon: Lightbulb, title: 'LED Signage', desc: 'Front-lit, back-lit and side-lit illuminated channel letters with energy-efficient LED.', img: sLed },
  { icon: Layers, title: 'Acrylic Signage', desc: 'Premium acrylic letters, light boxes and layered logos with polished or matte finishes.', img: sAcrylic },
  { icon: Award, title: '3D Letter Signage', desc: 'Chaneleum, brushed stainless steel, brass and aluminium moulded 3D letters.', img: s3d },
  { icon: Car, title: 'Vehicle Branding', desc: 'Full vehicle wraps, partial branding and fleet livery for cars, trucks and vans.', img: sVehicle },
  { icon: Map, title: 'Wayfinding Signage', desc: 'Name & floor directories, room plaques and hanging directional signs in metal & acrylic.', img: sWayfinding },
  { icon: Monitor, title: 'Digital Signage', desc: 'Indoor & outdoor LED video walls, menu boards, kiosks and interactive displays.', img: sDigital },
  { icon: Scissors, title: 'CNC Cutting', desc: 'Precision CNC routing for acrylic, ACP, MDF, foam and metals up to large formats.', img: sCnc },
  { icon: Flame, title: 'Laser Cutting', desc: 'Sharp laser cutting and engraving for metals, acrylics and signage components.', img: sLaser },
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
  { id: 'led-channel', name: 'LED Channel Letters', category: 'LED Signs', img: pLedChannel, desc: 'Front-lit and back-lit illuminated channel letters for exterior branding.' },
  { id: 'acrylic-3d', name: 'Acrylic 3D Letters', category: 'Acrylic Letters', img: pAcrylic3d, desc: 'Premium polished or matte acrylic letters in any thickness or finish.' },
  { id: 'neon-led', name: 'LED Neon Sign', category: 'Neon Signs', img: pNeon, desc: 'Custom LED neon flex signs — safer and more efficient than traditional neon.' },
  { id: 'reception-logo', name: 'Reception Logo Wall', category: 'Reception Signs', img: pReception, desc: '3D letters in acrylic, brushed aluminium or stainless steel for receptions.' },
  { id: 'exit-sign', name: 'Emergency Exit Sign', category: 'Safety Signs', img: pExit, desc: 'UAE civil-defense compliant illuminated exit and safety signage.' },
  { id: 'pylon', name: 'Illuminated Pylon Sign', category: 'Pylon Signs', img: pPylon, desc: 'Free-standing illuminated pylons engineered to UAE wind-load standards.' },
  { id: 'wayfinding', name: 'Wayfinding Plaque', category: 'Directional Signs', img: pWayfinding, desc: 'Acrylic or brushed metal plaques for floors, rooms and directories.' },
  { id: 'stainless-3d', name: 'Stainless Steel 3D Letters', category: '3D Letters', img: pStainless, desc: 'Hand-finished brushed or mirror-polished stainless steel 3D letters.' },
  { id: 'led-lightbox', name: 'LED Light Box', category: 'LED Signs', img: pLightbox, desc: 'Slim aluminum frame light boxes with edge-lit LED panels.' },
  { id: 'flex-banner', name: 'Flex Face Light Box', category: 'LED Signs', img: pFlex, desc: 'Tensioned flex face illuminated boxes for large-format façades.' },
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

// Service categories sourced verbatim from the uploaded "Our Services" document
export type ServiceGroup = {
  title: string;
  intro?: string;
  items: { name: string; desc: string }[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: 'Exterior / External Signages',
    items: [
      { name: '3D Illuminated Signage', desc: 'Chaneleum, Acrylic, Aluminium moulded letters, Illuminated Light Boxes and Forex Letters.' },
      { name: 'Metal Signs', desc: 'Stainless Steel 3D Signs, Brass Signs and Aluminium Signs.' },
      { name: 'Illumination Style', desc: 'Front Lit, Back Lit, Side Lit and Non-illuminated Letters.' },
      { name: 'Flags', desc: 'Satin and German Polyester flags for outdoor branding.' },
      { name: 'Banners', desc: 'Flex face illuminated light boxes for façades and storefronts.' },
      { name: 'Billboards', desc: 'Large-format outdoor billboards engineered for UAE wind & weather.' },
    ],
  },
  {
    title: 'Interior / Internal Signages',
    items: [
      { name: 'Reception Signs', desc: '3D letters in Acrylic, Brushed Aluminium or Stainless Steel mounted on background or wall.' },
      { name: 'Wayfinding & Directional Signage', desc: 'Name & floor directories made from acrylic, aluminium and stainless steel.' },
      { name: 'Room / Office Plaques', desc: 'Signs on individual doors for conference rooms, restrooms, and offices in acrylic, metal or wood.' },
      { name: 'Hanging Directional Signs', desc: 'Ceiling-suspended signs for large retail or warehouse spaces directing to departments or aisles.' },
    ],
  },
  {
    title: 'Compliance and Safety Signs',
    items: [
      { name: 'Compliant Signs', desc: 'Signs for permanent rooms — restrooms, exits, room numbers — following local guidelines.' },
      { name: 'Safety / Exit Signs', desc: 'Universally recognized symbols for fire extinguishers, first aid kits, emergency exits and stairs/elevator.' },
      { name: 'Regulatory Signs', desc: 'Simple rule signs such as "No Smoking", "Authorized Personnel Only" or capacity limits.' },
    ],
  },
  {
    title: 'Promotional & Informational Signage',
    items: [
      { name: 'Point-of-Purchase (POP) Signs', desc: 'Displays near a product or checkout area to drive final sales.' },
      { name: 'Digital Displays / Kiosks', desc: 'Screens easily updated for menus, announcements or interactive wayfinding maps.' },
      { name: 'Floor Graphics', desc: 'Durable vinyl decals on the floor used for guiding traffic, promoting products or branding a path.' },
      { name: 'Wall Graphics / Wall Branding', desc: 'Wall murals and full-color branded environments.' },
      { name: 'Frosted Window / Glass Graphics', desc: 'Privacy frosting, window graphics and decorative glass film.' },
      { name: 'Wide Format Printing', desc: 'High-resolution large-format prints for hoardings and banners.' },
    ],
  },
  {
    title: 'Wide Format Printing',
    items: [
      { name: 'Signage and Displays', desc: 'Large banners, posters, billboards, trade-show graphics and point-of-purchase (POP) displays.' },
      { name: 'Vehicle Wraps', desc: 'Full-color graphics that turn cars, trucks and fleets into mobile advertisements.' },
      { name: 'Decor and Murals', desc: 'Custom wallpaper, wall decals, murals and fine art reproductions on canvas.' },
      { name: 'Textiles', desc: 'Printing on fabrics for soft signage, apparel and home décor.' },
      { name: 'Offset and Screen Printing', desc: 'Traditional offset and screen printing for high-volume promotional materials.' },
    ],
  },
];

// "Our Services" workflow — copied verbatim from the uploaded "Our Services" document.
export const SERVICE_WORKFLOW: { title: string; desc: string }[] = [
  { title: 'Concept & Design', desc: 'Working with you to determine the right type, size, material, and design for your sign based on your goals, brand, and location.' },
  { title: 'Fabrication / Printing', desc: 'Producing the physical sign, banner, or graphic using various materials (vinyl, metal, plastic, foam, digital screens, etc.).' },
  { title: 'Installation', desc: 'Professionally mounting and installing the finished signage, which can be critical for large exterior signs or electrical signs. This often includes handling local permits and compliance requirements.' },
  { title: 'Maintenance and Repair', desc: 'Ongoing services to keep your signs clean, bright, and in good working order.' },
  { title: 'Digital Signage Solutions', desc: 'This is a growing area that involves setting up and managing digital screens and displays.' },
];

// Replaced total list with 7 accurate parent and sister concerns with exact names and logo lines
export const COMPANIES = [
  {
    name: 'Speedex Signages',
    slug: 'speedex-signages',
    desc: 'UAE signage manufacturing, branding & installation.',
    url: '/',
    internal: true,
    initials: 'SS',
    logo: '/assets/logos/speedex-signages.png'
  },
  {
    name: 'Speedex Facilities Management',
    slug: 'speedex-facilities-management',
    desc: 'Integrated property maintenance, MEP installation, safety compliance, and comprehensive building operations.[cite: 5]',
    url: 'https://speedexgroups.ae/about-us',
    internal: false,
    initials: 'SF',
    logo: '/assets/logos/speedex-fm.png'
  },
  {
    name: 'Speedex Car Rental',
    slug: 'speedex-car-rental',
    desc: 'Premium vehicle fleet rentals, luxury options, and corporate transportation logistics throughout the UAE.',
    url: 'https://speedexgroups.ae',
    internal: false,
    initials: 'CR',
    logo: '/assets/logos/speedex-car-rental.png'
  },
  {
    name: 'Speedex Auto Workshop',
    slug: 'speedex-auto-workshop',
    desc: 'Advanced fleet maintenance diagnostics, mechanical repairs, and heavy equipment engineering solutions.[cite: 1]',
    url: 'https://www.speedexgroups.ae',
    internal: false,
    initials: 'SA',
    logo: '/assets/logos/speedex-auto.png'
  },
  {
    name: 'Excellent Field Contracting',
    slug: 'excellent-field-contracting',
    desc: 'Turnkey civil construction, ADNOC-related contracting services, infrastructure development, and structural project operations.',
    url: 'https://excellentcontracting.ae/',
    internal: false,
    initials: 'EF',
    logo: '/assets/logos/excellent-contracting.png'
  },
  {
    name: 'Excellent General Trading',
    slug: 'excellent-general-trading',
    desc: 'Global B2B supply chain operations, general wholesale trading, and enterprise inventory logistics across the UAE.',
    url: 'https://www.excellentgroup.ae',
    internal: false,
    initials: 'EG',
    logo: '/assets/logos/excellent-trading.png'
  },
  {
    name: 'Arabsat Transport',
    slug: 'arabsat-satellite-operations',
    desc: 'Specialized high-tech logistics, fleet transport management, tracking data systems, and secure communication-linked distribution across the MENA region.',
    url: 'https://www.arabsat.ae',
    internal: false,
    initials: 'AT',
    logo: '/assets/logos/arabsat.png'
  }
];
