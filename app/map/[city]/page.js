"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, MapPinned } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cityDirectoryTabs, lahoreSocieties } from "@/lib/citySocieties";

const defaultDirectoryListings = Object.entries(lahoreSocieties).flatMap(([letter, names]) => names.map((name, index) => ({ id: "lahore-" + letter + "-" + index, name, city: "Lahore", letter, status: "Published" })));
const tabLetterGroups = { "A - F": ["A", "B", "C", "D", "E", "F"], "G - L": ["G", "H", "I", "J", "K", "L"], "M - R": ["M", "N", "O", "P", "Q", "R"], "S - Z": ["S", "T", "U", "V", "W", "X", "Y", "Z"] };

function readDirectoryListings() {
  if (typeof window === "undefined") return defaultDirectoryListings;
  try {
    const saved = JSON.parse(window.localStorage.getItem("nayizameen-city-directory") || "null");
    return Array.isArray(saved) ? saved : defaultDirectoryListings;
  } catch {
    return defaultDirectoryListings;
  }
}

function formatCity(slug) {
  return String(slug || "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CityMapPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const citySlug = String(params?.city || "lahore").toLowerCase();
  const city = formatCity(citySlug);
  const query = searchParams.get("q") || "";
  const [directoryTab, setDirectoryTab] = useState("A - F");
  const [directoryListings] = useState(readDirectoryListings);
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("nayizameen-city-directory") || "null");
      if (Array.isArray(saved)) setDirectoryListings(saved);
    } catch {
      // Keep the bundled directory when local storage is unavailable.
    }
  }, []);
  const directoryGroups = useMemo(() => {
    const groups = (tabLetterGroups[directoryTab] || []).filter((letter) => directoryListings.some((item) => item.city.toLowerCase() === city.toLowerCase() && item.letter === letter));
    return groups.map((letter) => ({ letter, items: directoryListings.filter((item) => item.city.toLowerCase() === city.toLowerCase() && item.letter === letter && item.status !== "Draft" && item.name.toLowerCase().includes(query.toLowerCase())).map((item) => item.name) })).filter(({ items }) => items.length);
  }, [city, directoryListings, directoryTab, query]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-primary-50 via-white to-amber-50 py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Link href="/maps" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to Maps
            </Link>
            <div className="mt-8 flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-700 text-white">
                <MapPinned className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold tracking-wider text-primary-700">CITY CATEGORY</p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Society Maps in {city}</h1>
                <p className="mt-2 text-sm text-slate-500">Browse societies and open their locations in Google Maps.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-primary-700">{city.toUpperCase()}</p>
                <h2 className="mt-1 text-2xl font-bold">All Society Maps in {city}</h2>
              </div>
              {citySlug === "lahore" && <p className="text-sm text-slate-500">{directoryGroups.reduce((total, group) => total + group.items.length, 0)} societies listed</p>}
            </div>

            {citySlug === "lahore" ? (
              <>
                <div className="mt-6 flex flex-wrap gap-6 border-b border-slate-200 text-sm font-semibold text-slate-700">
                  {cityDirectoryTabs.map((tab) => (
                    <button key={tab} type="button" onClick={() => setDirectoryTab(tab)} className={"relative pb-3 transition " + (directoryTab === tab ? "text-primary-700" : "hover:text-primary-700")}>
                      {tab}
                      {directoryTab === tab && <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-primary-600" />}
                    </button>
                  ))}
                </div>
                {directoryGroups.length ? (
                  <div className="mt-7 space-y-7">
                    {directoryGroups.map(({ letter, items }) => (
                      <section key={letter}>
                        <h3 className="mb-2 text-sm font-bold text-slate-900">{letter}</h3>
                        <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
                          {items.map((name, index) => (
                            <a key={letter + "-" + name + "-" + index} href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(name + ", " + city + ", Pakistan")} target="_blank" rel="noreferrer" className="flex min-h-7 items-start gap-1 text-xs leading-5 text-slate-600 transition hover:text-primary-700">
                              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />{name}
                            </a>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : <p className="mt-7 text-sm text-slate-500">No societies match your search.</p>}
              </>
            ) : <p className="mt-7 text-sm text-slate-500">The society directory for {city} will be added soon.</p>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}





