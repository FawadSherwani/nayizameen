"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bath, BedDouble, ChevronDown, ChevronLeft, ChevronRight, MapPin, Ruler, Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const defaultProperties = [
  { id: 1, title: "10 Marla Modern House", location: "DHA Phase 6, Lahore", price: "PKR 2.75 Crore", purpose: "For Sale", type: "House", beds: 5, baths: 6, area: "10 Marla", badge: "Featured", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { id: 2, title: "5 Marla Residential Plot", location: "Bahria Town, Karachi", price: "PKR 65 Lakh", purpose: "For Sale", type: "Plot", area: "5 Marla", badge: "Verified", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" },
  { id: 3, title: "2 Bed Luxury Apartment", location: "Bahria Town, Lahore", price: "PKR 45,000 / Month", purpose: "For Rent", type: "Apartment", beds: 2, baths: 2, area: "950 Sq. Ft.", badge: "Featured", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80" },
  { id: 4, title: "1 Kanal Executive House", location: "DHA Phase 5, Islamabad", price: "PKR 4.25 Crore", purpose: "For Sale", type: "House", beds: 6, baths: 6, area: "1 Kanal", badge: "Verified", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80" },
  { id: 5, title: "8 Marla Corner Plot", location: "Park View City, Lahore", price: "PKR 1.15 Crore", purpose: "For Sale", type: "Plot", area: "8 Marla", badge: "New", image: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=800&q=80" },
  { id: 6, title: "3 Bed Family Apartment", location: "Gulberg, Lahore", price: "PKR 85,000 / Month", purpose: "For Rent", type: "Apartment", beds: 3, baths: 3, area: "1,550 Sq. Ft.", badge: "Verified", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80" },
  { id: 7, title: "7 Marla Brand New House", location: "Bahria Town Phase 8, Rawalpindi", price: "PKR 2.1 Crore", purpose: "For Sale", type: "House", beds: 5, baths: 5, area: "7 Marla", badge: "Featured", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { id: 8, title: "10 Marla Commercial Plot", location: "DHA City, Karachi", price: "PKR 1.8 Crore", purpose: "For Sale", type: "Plot", area: "10 Marla", badge: "Verified", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80" },
  { id: 9, title: "Furnished Studio Apartment", location: "E-11, Islamabad", price: "PKR 55,000 / Month", purpose: "For Rent", type: "Apartment", beds: 1, baths: 1, area: "600 Sq. Ft.", badge: "New", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" },
  { id: 10, title: "5 Marla Double Storey House", location: "Johar Town, Lahore", price: "PKR 1.65 Crore", purpose: "For Sale", type: "House", beds: 4, baths: 4, area: "5 Marla", badge: "Verified", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80" },
  { id: 11, title: "4 Marla Residential Plot", location: "Capital Smart City, Islamabad", price: "PKR 42 Lakh", purpose: "For Sale", type: "Plot", area: "4 Marla", badge: "Featured", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80" },
  { id: 12, title: "2 Bed Apartment with Balcony", location: "Clifton, Karachi", price: "PKR 95,000 / Month", purpose: "For Rent", type: "Apartment", beds: 2, baths: 2, area: "1,200 Sq. Ft.", badge: "Verified", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
];

function PropertyCard({ property }) {
  return (
    <Link href={`/properties/${property.id}`} className="block overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52">
        <Image src={property.image || "/property-placeholder.svg"} alt={property.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">{property.badge && <span className="rounded bg-primary-700 px-2.5 py-1 text-xs font-semibold text-white">{property.badge}</span>}<span className="rounded bg-primary-700 px-2.5 py-1 text-xs font-semibold text-white">{property.purpose}</span></div>
      </div>
      <div className="p-4">
        <p className="mb-1 text-lg font-semibold text-primary-700">{property.price}</p>
        <h2 className="truncate text-base font-semibold text-gray-900">{property.title}</h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4 text-primary-700" />{property.location}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-xs font-medium text-gray-500">
          {property.beds && <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{property.beds} Beds</span>}
          {property.baths && <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.baths} Baths</span>}
          <span className="flex items-center gap-1"><Ruler className="h-4 w-4" />{property.area}</span>
        </div>
      </div>
    </Link>
  );
}

function belongsToOwner(property, ownerId, onlyMyListings) {
  return !onlyMyListings || String(property?.ownerId || "").trim().toLowerCase() === ownerId;
}

function loadProperties(remoteProperties = []) {
  const builtInProperties = defaultProperties.map((property) => ({ ...property, status: "Published" }));
  if (typeof window === "undefined") return builtInProperties;
  try {
    const saved = JSON.parse(window.localStorage.getItem("nayizameen-admin-properties") || "[]");
    const allSaved = [...(Array.isArray(saved) ? saved : []), ...(Array.isArray(remoteProperties) ? remoteProperties : [])];
    const userProperties = allSaved
      .filter((property) => property && String(property.status || "Published").toLowerCase() !== "rejected")
      .map((property) => ({ ...property, id: String(property.id), status: "Published", image: property.image || "/property-placeholder.svg", badge: property.badge || "New" }));
    const uniqueProperties = Array.from(new Map(userProperties.map((property) => [property.id, property])).values());
    const savedIds = new Set(uniqueProperties.map((property) => String(property.id)));
    return [...uniqueProperties, ...builtInProperties.filter((property) => !savedIds.has(String(property.id)))];
  } catch {
    return builtInProperties;
  }
}

export default function PropertiesPage() {
  const onlyMyListings = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("mine") === "1";
  const currentOwnerId = typeof window === "undefined" ? "" : String(JSON.parse(window.localStorage.getItem("nayizameen-session") || "null")?.email || "").trim().toLowerCase();
  const [properties, setProperties] = useState(() => loadProperties().filter((property) => belongsToOwner(property, currentOwnerId, onlyMyListings)));
  useEffect(() => {
    const refreshProperties = async () => {
      let remoteProperties = [];
      try {
        const response = await fetch("/api/properties", { cache: "no-store" });
        if (response.ok) remoteProperties = (await response.json()).properties || [];
      } catch {
        remoteProperties = [];
      }
      setProperties(loadProperties(remoteProperties).filter((property) => belongsToOwner(property, currentOwnerId, onlyMyListings)));
    };
    refreshProperties();
    window.addEventListener("storage", refreshProperties);
    window.addEventListener("nayizameen-properties-updated", refreshProperties);
    return () => {
      window.removeEventListener("storage", refreshProperties);
      window.removeEventListener("nayizameen-properties-updated", refreshProperties);
    };
  }, [currentOwnerId, onlyMyListings]);
  const getParam = (key, fallback) => typeof window === "undefined" ? fallback : new URLSearchParams(window.location.search).get(key) || fallback;
  const [query, setQuery] = useState(() => getParam("location", ""));
  const [purpose, setPurpose] = useState(() => getParam("purpose", "All"));
  const [type, setType] = useState(() => getParam("type", "All"));
  const [area, setArea] = useState(() => getParam("area", "All"));
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProperties = useMemo(() => properties.filter((property) => {
    const matchesQuery = `${property.title} ${property.location}`.toLowerCase().includes(query.toLowerCase());
    const matchesType = type === "Commercial" ? property.title.toLowerCase().includes("commercial") : type === "All" || property.type === type;
    return matchesQuery && (purpose === "All" || property.purpose === purpose) && matchesType && (area === "All" || property.area === area);
  }), [properties, query, purpose, type, area]);

  const pageSize = 9;
  const pageCount = Math.max(1, Math.ceil(filteredProperties.length / pageSize));
  const visiblePage = Math.min(currentPage, pageCount);
  const paginatedProperties = filteredProperties.slice((visiblePage - 1) * pageSize, visiblePage * pageSize);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-primary-800 py-12 text-white md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <p className="mb-2 text-sm font-semibold tracking-wider text-primary-100">PROPERTY LISTINGS</p>
            <h1 className="text-3xl font-bold md:text-4xl">Find your next property</h1>
            <p className="mt-3 max-w-2xl text-primary-100">Browse verified homes, plots, and apartments across Pakistan.</p>
          </div>
        </section>
        <section className="mx-auto -mt-6 max-w-7xl px-4 pb-16 md:px-6">
          <div className="rounded-xl bg-white p-4 shadow-lg md:p-5">
            <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
              <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3"><Search className="h-5 w-5 text-gray-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by area or property" className="h-11 w-full bg-transparent text-sm outline-none" /></label>
              <label className="relative"><select value={purpose} onChange={(event) => setPurpose(event.target.value)} className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium outline-none"><option>All</option><option>For Sale</option><option>For Rent</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" /></label>
              <label className="relative"><select value={type} onChange={(event) => setType(event.target.value)} className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium outline-none"><option>All</option><option>House</option><option>Apartment</option><option>Plot</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400" /></label>
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 text-sm font-medium text-white hover:bg-primary-800"><SlidersHorizontal className="h-4 w-4" />Filters</button>
            </div>
          </div>
          <div className="mt-10 flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-primary-700">{onlyMyListings ? "YOUR LISTINGS" : "PROPERTIES FOR YOU"}</p><h2 className="mt-1 text-2xl font-semibold text-gray-900">{onlyMyListings ? "My Listings" : "All Properties"}</h2></div><p className="text-sm text-gray-500">{filteredProperties.length} properties found</p></div>
          {filteredProperties.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{paginatedProperties.map((property) => <PropertyCard key={property.id} property={property} />)}</div> : <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center"><p className="font-medium text-gray-900">{onlyMyListings ? "You have not posted any listings yet" : "No properties found"}</p><button type="button" onClick={() => { setQuery(""); setPurpose("All"); setType("All"); setArea("All"); setCurrentPage(1); }} className="mt-3 text-sm font-medium text-primary-700 hover:underline">Clear filters</button></div>}
          {filteredProperties.length > pageSize && <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Property pagination"><button type="button" disabled={visiblePage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-primary-700 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => <button type="button" key={page} onClick={() => setCurrentPage(page)} className={"h-9 min-w-9 rounded-lg px-2 text-sm font-semibold transition " + (page === visiblePage ? "bg-primary-700 text-white" : "border border-gray-200 text-gray-600 hover:border-primary-700 hover:text-primary-700")} aria-current={page === visiblePage ? "page" : undefined}>{page}</button>)}<button type="button" disabled={visiblePage === pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-primary-700 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button></nav>}
          <div className="mt-10 text-center"><Link href="/" className="text-sm font-medium text-primary-700 hover:underline">Back to homepage</Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}