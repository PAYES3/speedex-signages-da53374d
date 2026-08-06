



Claim offer

image(20260806-083831).png
IDHU ENGA IRUKUNU SOLLU - CODE LA

அப்படின்னா slide வருகிறது, image path மட்டும் wrong.

இந்த 3 விஷயத்தை check பண்ணுங்க:

1. Console-ல image URL print பண்ணுங்க
console.log(currentSlide.image);
என்ன output வருது?

2. Image load ஆகுதானு check பண்ணுங்க
<img
  src={currentSlide.image}
  alt={currentSlide.title}
  onError={() => console.log("Image failed:", currentSlide.image)}
  onLoad={() => console.log("Loaded:", currentSlide.image)}
  className="w-full h-full object-cover"
/>
Image failed: வந்தா path problem.

3. Path correct-ஆ?
❌ இதுபோல இருந்தா:

image: "/src/assets/hero/SIGNAGE-5-(BASCOM).jpg"
அதை:

import SIGNAGE5 from "@/assets/hero/SIGNAGE-5-(BASCOM).jpg";

image: SIGNAGE5
ஆக மாற்றுங்க.

அல்லது public/hero folder-ல image இருந்தா:

image: "/hero/SIGNAGE-5-(BASCOM).jpg"
எனக்கு இந்த இரண்டு விஷயம் அனுப்புங்க:
4th slide object மட்டும்

F12 Console-ல வரும் error (சிவப்பு நிற error)

அத பார்த்து exact fix சொல்லுறேன்.



Pasted text(1).txt
Document
idhula ulla code la image show aagala. Naa epdi image podurathu.

உங்க code பார்த்தேன். Problem இந்த line-ல இருக்கு:

logo_url: "/assets/logos/Excellent trading logo_page-0001.jpg",
அதே மாதிரி எல்லா companies-க்கும்:

logo_url: "/assets/logos/Speedex Signages LOGO_page-0001.jpg",


Image எப்படி add பண்ணணும்?
Option 1 (Recommended)
public folder-ல images வைங்க:

public/
└── assets/
    └── logos/
        ├── Speedex Signages LOGO_page-0001.jpg
        ├── CARS RENTAL LOGO_page-0001.jpg
        ├── Facility management logo_page-0001.jpg
        ├── workshop logo ( updated )_page-0001.jpg
        ├── Excellent Feild contract_page-0001.jpg
        ├── Excellent trading logo_page-0001.jpg
        └── ARABSAT LOGO_page-0001.jpg
அப்போ இந்த path வேலை செய்யும்:

logo_url: "/assets/logos/Excellent trading logo_page-0001.jpg"
Option 2 (Vite import)
Images src/assets/logos-ல இருந்தா import பண்ணணும்:

import ExcellentTradingLogo from "@/assets/logos/Excellent trading logo_page-0001.jpg";
பிறகு:

logo_url: ExcellentTradingLogo,
Image ஏன் show ஆகலை?
இந்த URL browser-ல open பண்ணி பாருங்க:

http://localhost:5173/assets/logos/Excellent trading logo_page-0001.jpg
Image open ஆயிட்டா → code சரி.

404 Not Found வந்தா → image அந்த location-ல இல்லை.

Quick check
VS Code Explorer-ல இந்த file இருக்கா?

public/assets/logos/Excellent trading logo_page-0001.jpg
அல்லது

src/assets/logos/Excellent trading logo_page-0001.jpg
எந்த folder-ல images இருக்கு? (public/assets/logos அல்லது src/assets/logos) அத மட்டும் சொல்லுங்க. அதுக்கேற்ற exact code கொடுக்கிறேன்.


logo ok problem illa, but slide oduthula adhuku naa image upload pannanum epdi panrathu

Machan, logo upload இல்லை, background slide image எப்படி upload பண்ணணும்னு கேக்குற.

உங்க code-ல background image இந்த line-ல use ஆகுது:

<img
  src={currentCompany.bg_url}
  alt={currentCompany.name}
  className="h-full w-full object-cover"
/>


bg_url தற்போது Unsplash URL ஆக இருக்கு:

bg_url: "https://images.unsplash.com/photo-..."


உங்க own image use பண்ணணும்னா
Option 1 (Best)
Images-ஐ இந்த folder-ல copy பண்ணுங்க:

public/assets/company-bg/
Example:

public/assets/company-bg/
├── speedex-signages.jpg
├── rent-a-car.jpg
├── trading.jpg
├── workshop.jpg
பிறகு bg_url-ஐ update பண்ணுங்க:

{
  id: "6",
  name: "Excellent General Trading",
  ...
  bg_url: "/assets/company-bg/trading.jpg",
}
Option 2 (src/assets use பண்ணினா)
import TradingBg from "@/assets/company-bg/trading.jpg";
பிறகு:

bg_url: TradingBg,
CMS-ல upload பண்ணணும்னா
இப்போ இந்த code hardcoded array-ல இருக்கு. அதனால Admin upload பண்ண முடியாது. அதுக்கு:

Supabase Storage upload

bg_url database-ல save

ALL_COMPANIES array-க்கு பதிலா database fetch

இது implement பண்ணணும்.

ஒரு கேள்வி:

👉 நீ இப்போ code-ல image add பண்ணணுமா?
அல்லது Admin CMS-ல Upload button வைத்து image change பண்ணணுமா?


image(20260806-125544).png
idhula arab-4, EFC,signages 4, wrkshop-4,Fc-M - idhellam slide ku add pannanum code kodu. theliva explain panni sollu

Machan, உன்னோட images எல்லாம் src/assets/hero/ folder-ல இருக்கு. அதனால import பண்ணி SECONDARY_SLIDES array-ல add பண்ணணும்.

Step 1: Imports add பண்ணு
SecondarySlider.tsx top-la:

import SIGNAGE1 from '@/assets/hero/SIGNAGE-1.jpg';
import SIGNAGE2 from '@/assets/hero/SIGNAGE-2.jpg';
import SIGNAGE3 from '@/assets/hero/SIGNAGE-3.jpg';
import SIGNAGE4 from '@/assets/hero/SIGNAGE-4.jpg';

import ARAB2 from '@/assets/hero/ARAB-2.jpg';
import ARAB4 from '@/assets/hero/ARAB-4.jpg';

import EFC4 from '@/assets/hero/EXL-FC-4.jpg';

import FCM4 from '@/assets/hero/FC-M-4.jpg';

import WRKSHOP4 from '@/assets/hero/WRKSHP-4.png';
Note: File names screenshot-la irukura maadhiri exact match aaganum.

Example:

EXL-FC-4.jpg

FC-M-4.jpg

WRKSHP-4.png

Step 2: Existing array-ku new slides add pannu
const SECONDARY_SLIDES = [
  {
    id: 1,
    image: SIGNAGE1,
    badge: "INDOOR SIGNAGE",
    title: "Precision 3D Acrylic Letters",
    subtitle: "...",
    buttonText: "Explore Projects",
    buttonHref: "/portfolio",
  },

  {
    id: 2,
    image: SIGNAGE2,
    badge: "OUTDOOR SIGNAGE",
    title: "...",
    subtitle: "...",
    buttonText: "View Portfolio",
    buttonHref: "/portfolio",
  },

  {
    id: 3,
    image: SIGNAGE3,
    badge: "COMMERCIAL BRANDING",
    title: "...",
    subtitle: "...",
    buttonText: "Contact Us",
    buttonHref: "/contact",
  },

  {
    id: 4,
    image: SIGNAGE4,
    badge: "SIGNAGE",
    title: "Premium Signage Solutions",
    subtitle: "...",
    buttonText: "View Projects",
    buttonHref: "/portfolio",
  },

  {
    id: 5,
    image: ARAB4,
    badge: "TRANSPORT",
    title: "Arabsat Transport",
    subtitle: "...",
    buttonText: "Explore",
    buttonHref: "/companies/arabsat",
  },

  {
    id: 6,
    image: EFC4,
    badge: "CONTRACTING",
    title: "Excellent Field Contracting",
    subtitle: "...",
    buttonText: "Explore",
    buttonHref: "/companies/excellent-field-contracting",
  },

  {
    id: 7,
    image: WRKSHOP4,
    badge: "AUTO WORKSHOP",
    title: "Speedex Auto Workshop",
    subtitle: "...",
    buttonText: "Explore",
    buttonHref: "/companies/speedex-workshop",
  },

  {
    id: 8,
    image: FCM4,
    badge: "FACILITY MANAGEMENT",
    title: "Facility Management",
    subtitle: "...",
    buttonText: "Explore",
    buttonHref: "/companies/facility-management",
  },
];
Step 3: File names check பண்ணு
Screenshot-la:

✅ ARAB-2.jpg

❓ ARAB-4.jpg (நீ சொன்னது)

✅ EXL-FC-4.jpg

✅ FC-M-4.jpg

❓ WRKSHP-4.png (screenshot-la WRKSHP 2.png தான் தெரிகிறது)

WRKSHP-4.png file உண்மையிலேயே இருக்கா? இல்லையென்றால் அந்த exact filename-ஐ import செய்யணும்.

Step 4: Image show ஆகலனா
இந்த code add பண்ணு:

<img
  src={currentSlide.image}
  alt={currentSlide.title}
  onError={(e) => {
    console.log("Image failed:", currentSlide.image);
    console.log(e);
  }}
  className="w-full h-full object-cover"
/>
Console-la எந்த file fail ஆகுது என்று உடனே தெரியும்.

எனக்கு ஒரு doubt: Screenshot-la ARAB-4.jpg, FC-M-4.jpg, WRKSHP-4.png files தெரியலை; ARAB-2.jpg, FC-M-4.jpg, EXL-FC-4.jpg, WRKSHP 2.png மாதிரி தான் தெரிகிறது. Exact filenames-ஐ ஒரு screenshot அல்லது list அனுப்பினா, copy-paste பண்ணக்கூடிய imports-ஐ exact-ஆ கொடுக்கிறேன்.


Chats with attachments paused
You’ve used all your messages with Instant until 9:44 PM. Upgrade to keep working with files and images here, or start a new chat to continue with a lower quality model.

New chat

Claim free offer


import React, { useState, useEffect, useCallback } from "react";
import {
ArrowRight,
Building2,
Sparkles,
Play,
MapPin,
Phone,
Globe,
ChevronLeft,
ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Company {
id: string;
name: string;
slug: string;
tagline: string;
description: string;
logo_url: string;
bg_url: string;
}

// Direct public paths matching your exact GitHub repository filenames
const ALL_COMPANIES: Company[] = [
{
id: "1",
name: "Speedex Signages",
slug: "speedex-signages",
tagline: "LED, Acrylic & 3D Signage",
description: "Premier signage manufacturing, LED display solutions, acrylic fabrication, 3D signboards and vehicle branding across UAE.",
logo_url: "/assets/logos/Speedex Signages LOGO_page-0001.jpg",
bg_url: "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1200&q=80",
},
{
id: "2",
name: "Speedex Rent A Car",
slug: "speedex-rent-a-car",
tagline: "Luxury & Commercial Rental",
description: "Luxury, SUV and commercial vehicle rentals with airport transfers and corporate leasing services.",
logo_url: "/assets/logos/CARS RENTAL LOGO_page-0001.jpg",
bg_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
},
{
id: "3",
name: "Speedex Facility Management",
slug: "speedex-facility-management",
tagline: "Building Maintenance",
description: "Professional building maintenance, cleaning, MEP and complete facility management services.",
logo_url: "/assets/logos/Facility management logo_page-0001.jpg",
bg_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
},
{
id: "4",
name: "Speedex Auto Workshop",
slug: "speedex-workshop",
tagline: "Auto Repair Experts",
description: "Mechanical repairs, diagnostics, engine rebuilding, painting and complete automotive care.",
logo_url: "/assets/logos/workshop logo ( updated )_page-0001.jpg",
bg_url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
},
{
id: "5",
name: "Excellent Field Contracting",
slug: "excellent-field-contracting",
tagline: "Civil & Interior",
description: "Civil contracting, fit-out works, renovation and commercial construction solutions.",
logo_url: "/assets/logos/Excellent Feild contract_page-0001.jpg",
bg_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
},
{
id: "6",
name: "Excellent General Trading",
slug: "excellent-general-trading",
tagline: "General Trading",
description: "Import, export, uniforms, safety products, building materials and industrial supplies.",
logo_url: "/assets/logos/Excellent trading logo_page-0001.jpg",
bg_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
},
{
id: "7",
name: "Arabsat Transport",
slug: "arabsat",
tagline: "Passenger Transport",
description: "Luxury buses, staff transportation, labour transport and airport transfer solutions.",
logo_url: "/assets/logos/ARABSAT LOGO_page-0001.jpg",
bg_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
},
];

export function OurCompanies() {
const [currentIndex, setCurrentIndex] = useState(0);

const nextSlide = useCallback(() => {
setCurrentIndex((prev) => (prev === ALL_COMPANIES.length - 1 ? 0 : prev + 1));
}, []);

const prevSlide = () => {
setCurrentIndex((prev) => (prev === 0 ? ALL_COMPANIES.length - 1 : prev - 1));
};

useEffect(() => {
const timer = setInterval(nextSlide, 6000);
return () => clearInterval(timer);
}, [nextSlide]);

const currentCompany = ALL_COMPANIES[currentIndex];

return (
<section id="our-groups" className="relative overflow-hidden bg-background py-16 sm:py-24">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
        <Sparkles className="h-4 w-4" />
        Speedex Group
      </div>
      <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
        Our Companies
      </h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        7 industry-leading entities delivering excellence across signage, automotive, facilities, contracting, trading, and transportation in the UAE.
      </p>
    </div>

    {/* Carousel Container */}
    <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-[0_40px_90px_-50px_rgba(0,0,0,0.35)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCompany.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={currentCompany.bg_url}
            alt={currentCompany.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/10" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content */}
      <div className="relative z-10 flex min-h-[520px] items-center">
        <div className="max-w-xl px-6 py-10 sm:px-12">
          <motion.div
            key={currentCompany.name}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-black/5 bg-white/85 p-6 sm:p-8 backdrop-blur-xl shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)]"
          >
            {/* Logo Display Container */}
            <div className="mb-6 flex h-24 items-center justify-center rounded-xl bg-white p-3 border border-border">
              <img
                src={currentCompany.logo_url}
                alt={currentCompany.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="mb-3 inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              {currentCompany.tagline}
            </div>

            <h3 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-foreground">
              <Building2 className="h-7 w-7 text-primary" />
              {currentCompany.name}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {currentCompany.description}
            </p>

            <a
              href={`/companies/${currentCompany.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
            >
              Explore Company
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 p-3 text-foreground backdrop-blur hover:bg-primary transition-all"
        aria-label="Previous Company"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 p-3 text-foreground backdrop-blur hover:bg-primary transition-all"
        aria-label="Next Company"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {ALL_COMPANIES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex ? "h-2.5 w-8 bg-primary" : "h-2.5 w-2.5 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Info Footer */}
    <div className="mt-16 border-t border-border/60 pt-12">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <Play className="h-3.5 w-3.5 fill-current" />
          Corporate Showcase
        </div>
        <h3 className="mt-4 text-3xl font-bold text-foreground">
          Excellent Group of Companies
        </h3>
      </div>

      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Location</p>
              <p className="text-sm font-bold text-foreground">Abu Dhabi, UAE</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Contact</p>
              <a href="tel:+971557178432" className="block text-sm font-bold text-foreground hover:text-primary">
                +971 55 717 8432
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Website</p>
              <a href="https://www.excellentgroup.ae" target="_blank" rel="noreferrer" className="text-sm font-bold text-foreground hover:text-primary">
                www.excellentgroup.ae
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
);
}

export default OurCompanies;


Close
