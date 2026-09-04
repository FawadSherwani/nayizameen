"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Heart, Ruler, Bed, Bath } from "lucide-react";
import { useRef } from "react";
import { allProperties } from "@/lib/data";

export default function FeaturedProperties() {
  const railRef = useRef(null);
  const slide = (direction) => railRef.current?.scrollBy({ left: direction * (railRef.current.clientWidth / 2), behavior: "smooth" });

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Featured Properties</h2>
        <div className="flex items-center gap-4"><Link href="/properties" className="hidden items-center gap-1 text-sm font-semibold text-primary-700 hover:underline sm:flex">View All Properties <ArrowRight className="h-4 w-4" /></Link><div className="flex gap-2"><button type="button" onClick={() => slide(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-primary-700 hover:text-primary-700" aria-label="Previous properties"><ArrowLeft className="h-4 w-4" /></button><button type="button" onClick={() => slide(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-primary-700 hover:text-primary-700" aria-label="Next properties"><ArrowRight className="h-4 w-4" /></button></div></div>
      </div>
      <Link href="/properties" className="mb-5 flex items-center gap-1 text-sm font-semibold text-primary-700 sm:hidden">View All Properties <ArrowRight className="h-4 w-4" /></Link>
      <div ref={railRef} className="flex snap-x gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {allProperties.map((prop) => <Link href={"/properties/" + prop.id} key={prop.id} className="group min-w-[85%] snap-start overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md sm:min-w-[calc(50%-10px)] lg:min-w-[calc(25%-15px)]"><div className="relative h-40"><Image src={prop.image} alt={prop.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw" className="object-cover" /><div className="absolute left-3 top-3 flex gap-1">{prop.tags.map((tag) => <span key={tag} className="rounded bg-primary-800/90 px-2 py-1 text-[10px] font-bold text-white">{tag}</span>)}</div><span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90" aria-hidden="true"><Heart className="h-3.5 w-3.5 text-gray-500" /></span></div><div className="p-4"><h3 className="mb-1 font-semibold text-gray-900">{prop.title}</h3><p className="mb-2 flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" /> {prop.location}</p><div className="mb-2 flex items-center gap-3 text-xs text-gray-500">{prop.area && <span className="flex items-center gap-1"><Ruler className="h-3 w-3" /> {prop.area}</span>}{prop.beds && <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {prop.beds} Beds</span>}{prop.baths && <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {prop.baths} Baths</span>}</div><p className="text-sm font-bold text-primary-700">{prop.price}</p></div></Link>)}
      </div>
    </section>
  );
}
