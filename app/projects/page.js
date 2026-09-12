"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { featuredProjects as defaultProjects } from "@/lib/data";

const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ProjectsPage() {
  const [featuredProjects] = useState(() => {
    if (typeof window === "undefined") return defaultProjects;

    try {
      const savedProjects = JSON.parse(window.localStorage.getItem("nayizameen-admin-projects") || "[]");
      const mergedProjects = new Map(defaultProjects.map((project) => [project.title, project]));
      savedProjects.forEach((project) => {
        mergedProjects.set(project.title, { ...mergedProjects.get(project.title), ...project });
      });
      return Array.from(mergedProjects.values());
    } catch {
      return defaultProjects;
    }
  });

  return <>
    <Navbar />
    <main className="min-h-screen bg-gray-50">
      <section className="bg-primary-800 py-14 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-sm font-semibold tracking-wider text-primary-100">DISCOVER MORE</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">New projects across Pakistan</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-primary-100">Explore trusted communities, investment opportunities, and thoughtfully planned developments.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold tracking-wider text-primary-700">FEATURED DEVELOPMENTS</p><h2 className="mt-1 text-2xl font-semibold text-gray-900">Find your next investment</h2></div><span className="text-sm text-gray-500">{featuredProjects.length} projects</span></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project) => <Link href={"/projects/" + slugify(project.title)} key={project.title} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-52 overflow-hidden"><Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-primary-800/90 px-3 py-1 text-[10px] font-semibold tracking-wide text-white">{project.badge}</span></div>
            <div className="p-5"><h3 className="text-lg font-semibold text-gray-900">{project.title}</h3><p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4 text-primary-700" />{project.location}</p><p className="mt-4 text-sm font-semibold text-primary-700">{project.price}</p><span className="mt-5 flex items-center gap-1 text-sm font-medium text-primary-700">Explore project <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div>
          </Link>)}
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
