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

import SIGNAGE from "@/assets/hero/SIGNAGE-4.jpg";
import ARABSAT from "@/assets/hero/ARAB-2.jpg";
import EFC from "@/assets/hero/EXL-FC-4.jpg";
import FCM from "@/assets/hero/FC-M-4.jpg";
import WORKSHOP from "@/assets/hero/WRKSHP-2.png";


interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo_url: string;
  image?: string;
  bg_url?: string;
}


const ALL_COMPANIES: Company[] = [

  {
    id: "1",
    name: "Speedex Signages",
    image: SIGNAGE,
    slug: "speedex-signages",
    tagline: "LED, Acrylic & 3D Signage",
    description:
      "Premier signage manufacturing, LED display solutions, acrylic fabrication, 3D signboards and vehicle branding across UAE.",
    logo_url:
      "/assets/logos/Speedex Signages LOGO_page-0001.jpg",
  },


  {
    id: "2",
    name: "Speedex Rent A Car",
    slug: "speedex-rent-a-car",
    tagline: "Luxury & Commercial Rental",
    description:
      "Luxury, SUV and commercial vehicle rentals with airport transfers and corporate leasing services.",
    logo_url:
      "/assets/logos/CARS RENTAL LOGO_page-0001.jpg",
    bg_url:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },


  {
    id: "3",
    name: "Speedex Facility Management",
    image: FCM,
    slug: "speedex-facility-management",
    tagline: "Building Maintenance",
    description:
      "Professional building maintenance, cleaning, MEP and complete facility management services.",
    logo_url:
      "/assets/logos/Facility management logo_page-0001.jpg",
  },


  {
    id: "4",
    name: "Speedex Auto Workshop",
    image: WORKSHOP,
    slug: "speedex-workshop",
    tagline: "Auto Repair Experts",
    description:
      "Mechanical repairs, diagnostics, engine rebuilding, painting and complete automotive care.",
    logo_url:
      "/assets/logos/workshop logo ( updated )_page-0001.jpg",
  },


  {
    id: "5",
    name: "Excellent Field Contracting",
    image: EFC,
    slug: "excellent-field-contracting",
    tagline: "Civil & Interior",
    description:
      "Civil contracting, fit-out works, renovation and commercial construction solutions.",
    logo_url:
      "/assets/logos/Excellent Field contract_page-0001.jpg",
  },


  {
    id: "6",
    name: "Excellent General Trading",
    slug: "excellent-general-trading",
    tagline: "General Trading",
    description:
      "Import, export, uniforms, safety products, building materials and industrial supplies.",
    logo_url:
      "/assets/logos/Excellent trading logo_page-0001.jpg",
    bg_url:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },


  {
    id: "7",
    name: "Arabsat Transport",
    image: ARABSAT,
    slug: "arabsat",
    tagline: "Passenger Transport",
    description:
      "Luxury buses, staff transportation, labour transport and airport transfer solutions.",
    logo_url:
      "/assets/logos/ARABSAT LOGO_page-0001.jpg",
  },


];


export function OurCompanies() {

  const [currentIndex,setCurrentIndex] = useState(0);


  const nextSlide = useCallback(()=>{
    setCurrentIndex((prev)=>
      prev === ALL_COMPANIES.length-1
      ? 0
      : prev+1
    );
  },[]);



  const prevSlide = ()=>{
    setCurrentIndex((prev)=>
      prev===0
      ? ALL_COMPANIES.length-1
      : prev-1
    );
  };



  useEffect(()=>{

    const timer=setInterval(()=>{
      nextSlide();
    },6000);


    return ()=>clearInterval(timer);

  },[nextSlide]);



  const currentCompany = ALL_COMPANIES[currentIndex];



return (

<section
id="our-groups"
className="relative overflow-hidden bg-background py-16 sm:py-24"
>


<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">



{/* HEADER */}

<div className="mx-auto mb-14 max-w-3xl text-center">


<div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">

<Sparkles className="h-4 w-4"/>

Speedex Group

</div>


<h2 className="mt-6 text-4xl font-extrabold sm:text-5xl">

Our Companies

</h2>


<p className="mt-4 text-muted-foreground">

7 industry-leading entities delivering excellence across UAE.

</p>


</div>





{/* CAROUSEL */}


<div className="relative h-[520px] overflow-hidden rounded-3xl border bg-white shadow-xl">



<AnimatePresence mode="wait">


<motion.div
key={currentCompany.id}
initial={{opacity:0,scale:1.05}}
animate={{opacity:1,scale:1}}
exit={{opacity:0,scale:1.05}}
transition={{duration:.7}}
className="absolute inset-0"
>


<img
src={
currentCompany.image ||
currentCompany.bg_url
}
alt={currentCompany.name}
className="h-full w-full object-cover"
/>


<div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"/>


</motion.div>


</AnimatePresence>






<div className="relative z-10 flex h-full items-center">


<div className="max-w-xl px-6 sm:px-12">


<motion.div

key={currentCompany.name}

initial={{opacity:0,y:25}}

animate={{opacity:1,y:0}}

className="rounded-2xl bg-white/85 backdrop-blur-xl p-8 shadow-xl"

>


<div className="mb-6 flex h-24 items-center justify-center rounded-xl border bg-white p-3">


<img

src={currentCompany.logo_url}

alt={currentCompany.name}

className="max-h-full max-w-full object-contain"

/>


</div>




<div className="mb-3 inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">

{currentCompany.tagline}

</div>



<h3 className="flex items-center gap-3 text-3xl font-extrabold">

<Building2/>

{currentCompany.name}

</h3>



<p className="mt-3 text-muted-foreground">

{currentCompany.description}

</p>



<a

href={`/companies/${currentCompany.slug}`}

className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white"

>

Explore Company

<ArrowRight className="h-4 w-4"/>

</a>



</motion.div>


</div>


</div>







<button

onClick={prevSlide}

className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white p-3 shadow"

>

<ChevronLeft/>

</button>




<button

onClick={nextSlide}

className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white p-3 shadow"

>

<ChevronRight/>

</button>






<div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">


{
ALL_COMPANIES.map((_,index)=>(

<button

key={index}

onClick={()=>setCurrentIndex(index)}

className={`rounded-full transition-all ${
index===currentIndex
?"h-3 w-8 bg-primary"
:"h-3 w-3 bg-black/20"
}`}

/>

))

}


</div>



</div>






{/* FOOTER */}


<div className="mt-16 border-t pt-12">


<div className="mx-auto max-w-4xl rounded-2xl border bg-card p-6">


<div className="grid gap-6 md:grid-cols-3">



<div className="flex gap-3">

<MapPin/>

<div>

<p className="text-xs">
Location
</p>

<b>
Abu Dhabi, UAE
</b>

</div>

</div>




<div className="flex gap-3">

<Phone/>

<div>

<p className="text-xs">
Contact
</p>

<b>
+971 55 717 8432
</b>

</div>

</div>





<div className="flex gap-3">

<Globe/>

<div>

<p className="text-xs">
Website
</p>

<b>
www.excellentgroup.ae
</b>

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
