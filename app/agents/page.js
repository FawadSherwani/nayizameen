"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Star, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { agents as defaultAgents } from "@/lib/data";

export default function AgentsPage() {
  const [agents] = useState(() => {
    if (typeof window === "undefined") return defaultAgents;

    try {
      const savedAgents = JSON.parse(window.localStorage.getItem("nayizameen-admin-agents") || "[]");
      const mergedAgents = new Map(defaultAgents.map((agent) => [agent.id, agent]));
      savedAgents.forEach((agent) => {
        mergedAgents.set(agent.id, { ...mergedAgents.get(agent.id), ...agent });
      });
      return Array.from(mergedAgents.values());
    } catch {
      return defaultAgents;
    }
  });

  return <>
    <Navbar />
    <main className="min-h-screen bg-gray-50">
      <section className="bg-primary-800 py-14 text-white md:py-20"><div className="mx-auto max-w-7xl px-4 md:px-6"><p className="text-sm font-semibold tracking-wider text-primary-100">MEET THE EXPERTS</p><h1 className="mt-2 text-4xl font-bold md:text-5xl">Find a trusted property agent</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-primary-100">Connect with verified local experts who can help you buy, rent, or invest with confidence.</p></div></section>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"><div className="mb-7"><p className="text-sm font-semibold tracking-wider text-primary-700">VERIFIED AGENTS</p><h2 className="mt-1 text-2xl font-semibold text-gray-900">Our property advisors</h2></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{agents.map((agent) => <Link href={"/agents/" + agent.id} key={agent.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative h-56 bg-primary-50"><Image src={agent.avatar} alt={agent.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary-700"><ShieldCheck className="h-3.5 w-3.5" /> Verified</span></div><div className="p-5"><h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3><p className="mt-1 text-sm text-primary-700">{agent.role}</p><p className="mt-3 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4" />{agent.location}</p><div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500"><span>{agent.listings} active listings</span><span className="flex items-center gap-1 text-accent-700"><Star className="h-3.5 w-3.5 fill-current" /> Top advisor</span></div><span className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary-700">View profile <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div></Link>)}</div></section>
    </main>
    <Footer />
  </>;
}
