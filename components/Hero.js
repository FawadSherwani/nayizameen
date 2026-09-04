"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Home, MapPin, Ruler, Tag, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { stats, popularSearches } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-10 md:grid-cols-2 md:px-6 md:pt-14">
        <div><span className="mb-3 inline-block text-xs font-bold tracking-wider text-primary-700">PAKISTAN&apos;S TRUSTED PROPERTY PORTAL</span><h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">Find a Property with Ease and <span className="text-primary-700">Confidence</span></h1><p className="mb-6 max-w-md text-base text-gray-500 md:text-lg">Explore thousands of verified properties for sale, rent and investment across Pakistan.</p><div className="flex gap-8">{stats.map((stat) => <div key={stat.label}><div className="text-2xl font-extrabold text-primary-700 md:text-3xl">{stat.value}</div><div className="text-sm text-gray-500">{stat.label}</div></div>)}</div></div>
        <div className="relative h-64 overflow-hidden rounded-2xl md:h-96"><Image src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900&q=80" alt="Modern building" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority /></div>
      </div>
      <SearchBox />
    </section>
  );
}

const tabs = ["Buy", "Rent", "Projects", "Commercial"];

function SearchBox() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Buy");
  const [filters, setFilters] = useState({ type: "All Types", location: "All Cities", area: "All Areas", purpose: "All Purpose" });

  const setFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const search = (event) => {
    event?.preventDefault();
    if (activeTab === "Projects") { router.push("/projects"); return; }
    const params = new URLSearchParams();
    if (filters.type !== "All Types") params.set("type", filters.type);
    if (filters.location !== "All Cities") params.set("location", filters.location);
    if (filters.area !== "All Areas") params.set("area", filters.area);
    if (filters.purpose !== "All Purpose") params.set("purpose", filters.purpose);
    if (activeTab === "Commercial") params.set("type", "Commercial");
    router.push("/properties" + (params.toString() ? "?" + params.toString() : ""));
  };
  const selectTab = (tab) => {
    setActiveTab(tab);
    if (tab === "Buy") setFilter("purpose", "For Sale");
    if (tab === "Rent") setFilter("purpose", "For Rent");
    if (tab === "Commercial") setFilter("type", "Commercial");
  };
  const chooseCity = (city) => { setFilter("location", city); router.push("/properties?location=" + encodeURIComponent(city)); };

  return <div className="relative z-10 mx-auto -mt-6 max-w-6xl px-4 md:-mt-10 md:px-6"><div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl md:p-6">
    <div className="mb-5 flex gap-6 overflow-x-auto border-b border-gray-100 text-sm font-semibold text-gray-500">{tabs.map((tab) => <button type="button" key={tab} onClick={() => selectTab(tab)} className={"whitespace-nowrap pb-3 " + (activeTab === tab ? "border-b-2 border-primary-700 text-primary-700" : "hover:text-gray-800")}>{tab}</button>)}</div>
    <form onSubmit={search} className="grid grid-cols-2 gap-3 md:grid-cols-5">
      <SelectField icon={Home} label="Property Type" value={filters.type} onChange={(value) => setFilter("type", value)} options={["All Types", "House", "Apartment", "Plot", "Commercial"]} />
      <SelectField icon={MapPin} label="Location" value={filters.location} onChange={(value) => setFilter("location", value)} options={["All Cities", "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Gujranwala"]} />
      <SelectField icon={Ruler} label="Area" value={filters.area} onChange={(value) => setFilter("area", value)} options={["All Areas", "5 Marla", "8 Marla", "10 Marla", "1 Kanal"]} />
      <SelectField icon={Tag} label="Purpose" value={filters.purpose} onChange={(value) => setFilter("purpose", value)} options={["All Purpose", "For Sale", "For Rent"]} />
      <button type="submit" className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-primary-700 text-sm font-semibold text-white transition hover:bg-primary-800 md:col-span-1"><Search className="h-4 w-4" /> Search Properties</button>
    </form>
    <div className="mt-5 flex flex-wrap items-center gap-2"><span className="mr-1 text-xs font-semibold text-gray-500">Popular Searches:</span>{popularSearches.map((city) => <button type="button" key={city} onClick={() => chooseCity(city)} className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:border-primary-600 hover:text-primary-700">{city}</button>)}</div>
  </div></div>;
}

function SelectField({ icon: Icon, label, options, value, onChange }) {
  return <div className="col-span-1 rounded-lg border border-gray-200 px-3 py-2"><label className="flex items-center gap-1 text-[11px] text-gray-400"><Icon className="h-3.5 w-3.5" /> {label}</label><span className="relative block"><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none bg-transparent pr-5 text-sm font-medium focus:outline-none">{options.map((opt) => <option key={opt}>{opt}</option>)}</select><ChevronDown className="pointer-events-none absolute right-0 top-1 h-4 w-4 text-gray-500" /></span></div>;
}
