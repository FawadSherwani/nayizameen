"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Heart } from "lucide-react";
import { useRef } from "react";
import { featuredProjects } from "@/lib/data";

const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function FeaturedProjects() {
  const railRef = useRef(null);
  const slide = (direction) => railRef.current?.scrollBy({ left: direction * (railRef.current.clientWidth / 2), behavior: "smooth" });

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Featured Projects</h2>
        <div className="flex items-center gap-4"><Link href="/projects" className="hidden items-center gap-1 text-sm font-semibold text-primary-700 hover:underline sm:flex">View All Projects <ArrowRight className="h-4 w-4" /></Link><div className="flex gap-2"><button type="button" onClick={() => slide(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-primary-700 hover:text-primary-700" aria-label="Previous projects"><ArrowLeft className="h-4 w-4" /></button><button type="button" onClick={() => slide(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-primary-700 hover:text-primary-700" aria-label="Next projects"><ArrowRight className="h-4 w-4" /></button></div></div>
      </div>
      <Link href="/projects" className="mb-5 flex items-center gap-1 text-sm font-semibold text-primary-700 sm:hidden">View All Projects <ArrowRight className="h-4 w-4" /></Link>
      <div ref={railRef} className="flex snap-x gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {featuredProjects.map((project) => <Link href={"/projects/" + slugify(project.title)} key={project.title} className="group min-w-[85%] snap-start overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md sm:min-w-[calc(50%-10px)] lg:min-w-[calc(25%-15px)]"><div className="relative h-40"><Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw" className="object-cover" /><span className="absolute left-3 top-3 rounded bg-primary-800/90 px-2 py-1 text-[10px] font-bold text-white">{project.badge}</span><span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90" aria-hidden="true"><Heart className="h-3.5 w-3.5 text-gray-500" /></span></div><div className="p-4"><h3 className="mb-1 font-semibold text-gray-900">{project.title}</h3><p className="mb-2 flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" /> {project.location}</p><p className="mb-3 text-sm font-bold text-primary-700">{project.price}</p><span className="block rounded-lg bg-primary-700 py-2 text-center text-xs font-semibold text-white">View Details</span></div></Link>)}
      </div>
    </section>
  );
}
