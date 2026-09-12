"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit3, ExternalLink, MapPin, Plus, Search, Trash2, X } from "lucide-react";
import { lahoreSocieties } from "@/lib/citySocieties";

const defaultMaps = [
  { id: "dha-defence", name: "DHA Defence", city: "Lahore", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80", mapUrl: "https://www.google.com/maps/search/?api=1&query=DHA+Defence+Lahore", status: "Published" },
  { id: "park-view-city", name: "Park View City", city: "Lahore", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80", mapUrl: "https://www.google.com/maps/search/?api=1&query=Park+View+City+Lahore", status: "Published" },
];
const emptyMap = { name: "", city: "Lahore", image: "", mapUrl: "", status: "Published" };
const emptyListing = { name: "", city: "Lahore", letter: "A", status: "Published" };
const defaultCities = ["Lahore"];

const directoryDefaults = Object.entries(lahoreSocieties).flatMap(([letter, names]) =>
  names.map((name, index) => ({
    id: "lahore-" + letter.toLowerCase() + "-" + index + "-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    city: "Lahore",
    letter,
    status: "Published",
  })),
);

function readStorage(key, fallback) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(key) || "null");
    return Array.isArray(saved) ? saved : fallback;
  } catch {
    return fallback;
  }
}

function Field({ label, name, value, onChange, required = false, type = "text" }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span><input type={type} name={name} required={required} value={value} onChange={onChange} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-primary-700" /></label>;
}

export default function AdminMapsPage() {
  const [maps, setMaps] = useState(() => readStorage("nayizameen-admin-maps", defaultMaps));
  const [listings, setListings] = useState(() => readStorage("nayizameen-city-directory", directoryDefaults));
  const [cities, setCities] = useState(() => readStorage("nayizameen-city-taxonomy", defaultCities));
  const [mapQuery, setMapQuery] = useState("");
  const [listingQuery, setListingQuery] = useState("");
  const [mapForm, setMapForm] = useState(emptyMap);
  const [listingForm, setListingForm] = useState(emptyListing);
  const [editingMapId, setEditingMapId] = useState(null);
  const [editingListingId, setEditingListingId] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [listingOpen, setListingOpen] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    window.localStorage.setItem("nayizameen-admin-maps", JSON.stringify(maps));
    window.dispatchEvent(new Event("nayizameen-maps-updated"));
  }, [maps]);

  useEffect(() => {
    window.localStorage.setItem("nayizameen-city-directory", JSON.stringify(listings));
    window.dispatchEvent(new Event("nayizameen-directory-updated"));
  }, [listings]);

  useEffect(() => {
    window.localStorage.setItem("nayizameen-city-taxonomy", JSON.stringify(cities));
  }, [cities]);

  const allCities = useMemo(() => [...new Set([...cities, ...maps.map((item) => item.city), ...listings.map((item) => item.city)])].filter(Boolean).sort(), [cities, maps, listings]);
  const filteredMaps = useMemo(() => maps.filter((item) => (item.name + " " + item.city).toLowerCase().includes(mapQuery.toLowerCase())), [maps, mapQuery]);
  const filteredListings = useMemo(() => listings.filter((item) => (item.name + " " + item.city + " " + item.letter).toLowerCase().includes(listingQuery.toLowerCase())), [listings, listingQuery]);

  const updateMapForm = (event) => setMapForm({ ...mapForm, [event.target.name]: event.target.value });
  const updateListingForm = (event) => setListingForm({ ...listingForm, [event.target.name]: event.target.value });

  const saveMap = (event) => {
    event.preventDefault();
    const id = editingMapId || (mapForm.city + "-" + mapForm.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const item = { ...mapForm, id, image: mapForm.image || "/property-placeholder.svg", mapUrl: mapForm.mapUrl || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapForm.name + ", " + mapForm.city + ", Pakistan")) };
    setMaps((current) => editingMapId ? current.map((entry) => entry.id === editingMapId ? item : entry) : [item, ...current]);
    setMapOpen(false);
    setNotice(editingMapId ? "Society map updated." : "Society map published.");
  };

  const saveListing = (event) => {
    event.preventDefault();
    const id = editingListingId || (listingForm.city + "-" + listingForm.name + "-" + Date.now()).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const item = { ...listingForm, id, letter: listingForm.letter.toUpperCase() };
    setListings((current) => editingListingId ? current.map((entry) => entry.id === editingListingId ? item : entry) : [item, ...current]);
    setListingOpen(false);
    setNotice(editingListingId ? "City listing updated." : "City listing added.");
  };

  const addCity = (event) => {
    event.preventDefault();
    const value = newCity.trim();
    if (!value) return;
    if (allCities.some((city) => city.toLowerCase() === value.toLowerCase())) {
      setNotice("That city already exists.");
      return;
    }
    setCities((current) => [...current, value]);
    setNewCity("");
    setNotice(value + " city category added.");
  };

  const editMap = (item) => { setMapForm(item); setEditingMapId(item.id); setMapOpen(true); };
  const editListing = (item) => { setListingForm(item); setEditingListingId(item.id); setListingOpen(true); };
  const removeMap = (item) => { if (window.confirm("Delete " + item.name + "?")) setMaps((current) => current.filter((entry) => entry.id !== item.id)); };
  const removeListing = (item) => { if (window.confirm("Delete " + item.name + " from " + item.city + "?")) setListings((current) => current.filter((entry) => entry.id !== item.id)); };

  return <>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-sm font-bold text-primary-700">LOCATION MANAGEMENT</p><h1 className="mt-1 text-3xl font-bold">Society Maps</h1><p className="mt-2 text-sm text-slate-500">Manage map cards, city categories and society directory listings.</p></div>
      <button type="button" onClick={() => { setMapForm(emptyMap); setEditingMapId(null); setMapOpen(true); }} className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-4 py-3 text-sm font-semibold text-white"><Plus className="h-4 w-4" />Add map</button>
    </div>
    {notice && <p className="mt-5 rounded-xl bg-primary-50 px-4 py-3 text-sm font-medium text-primary-800">{notice}</p>}

    <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold text-primary-700">CITY TAXONOMY</p><h2 className="mt-1 text-xl font-bold text-slate-900">City categories</h2></div><form onSubmit={addCity} className="flex gap-2"><input value={newCity} onChange={(event) => setNewCity(event.target.value)} placeholder="Add city" className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary-700" /><button type="submit" className="inline-flex items-center gap-1 rounded-lg bg-primary-700 px-3 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" />Add city</button></form></div>
      <div className="mt-5 flex flex-wrap gap-2">{allCities.map((city) => <span key={city} className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">{city} <span className="ml-1 text-primary-400">{listings.filter((item) => item.city === city).length}</span></span>)}</div>
    </section>

    <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold text-primary-700">CITY DIRECTORY</p><h2 className="mt-1 text-xl font-bold text-slate-900">Society listings</h2></div><button type="button" onClick={() => { setListingForm({ ...emptyListing, city: allCities[0] || "Lahore" }); setEditingListingId(null); setListingOpen(true); }} className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" />Add listing</button></div>
      <label className="mt-5 flex h-11 max-w-lg items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input value={listingQuery} onChange={(event) => setListingQuery(event.target.value)} placeholder="Search listings, cities or letters..." className="w-full bg-transparent text-sm outline-none" /></label>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-400"><tr><th className="px-4 py-3">Listing</th><th className="px-4 py-3">City</th><th className="px-4 py-3">Letter</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody>{filteredListings.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="px-4 py-3 font-semibold">{item.name}</td><td className="px-4 py-3 text-slate-600">{item.city}</td><td className="px-4 py-3 text-slate-600">{item.letter}</td><td className="px-4 py-3"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{item.status}</span></td><td className="px-4 py-3"><div className="flex justify-end gap-1"><button type="button" onClick={() => editListing(item)} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50" aria-label={"Edit " + item.name}><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => removeListing(item)} className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" aria-label={"Delete " + item.name}><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div>
    </section>

    <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold text-primary-700">MAP CARDS</p><h2 className="mt-1 text-xl font-bold text-slate-900">Society map cards</h2></div><label className="flex h-11 max-w-lg flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input value={mapQuery} onChange={(event) => setMapQuery(event.target.value)} placeholder="Search maps or cities..." className="w-full bg-transparent text-sm outline-none" /></label></div>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-400"><tr><th className="px-4 py-3">Society</th><th className="px-4 py-3">City</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody>{filteredMaps.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="px-4 py-4 font-semibold">{item.name}</td><td className="px-4 py-4 text-slate-600"><span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary-700" />{item.city}</span></td><td className="px-4 py-4"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{item.status}</span></td><td className="px-4 py-4"><div className="flex justify-end gap-1"><a href={item.mapUrl} target="_blank" rel="noreferrer" className="rounded-lg p-2 text-slate-500 hover:bg-primary-50" aria-label={"Open " + item.name + " map"}><ExternalLink className="h-4 w-4" /></a><button type="button" onClick={() => editMap(item)} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50" aria-label={"Edit " + item.name}><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => removeMap(item)} className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" aria-label={"Delete " + item.name}><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div>
    </section>

    {mapOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"><form onSubmit={saveMap} className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-primary-700">MAP CARD</p><h2 className="mt-1 text-2xl font-bold">{editingMapId ? "Edit map" : "Add map"}</h2></div><button type="button" onClick={() => setMapOpen(false)} aria-label="Close map form"><X className="h-5 w-5 text-slate-400" /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Society name" name="name" value={mapForm.name} onChange={updateMapForm} required /><Field label="City" name="city" value={mapForm.city} onChange={updateMapForm} required /><div className="sm:col-span-2"><Field label="Cover image URL" name="image" value={mapForm.image} onChange={updateMapForm} /></div><div className="sm:col-span-2"><Field label="Google Maps URL (optional)" name="mapUrl" value={mapForm.mapUrl} onChange={updateMapForm} type="url" /></div><label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Status</span><select name="status" value={mapForm.status} onChange={updateMapForm} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"><option>Published</option><option>Draft</option></select></label></div><div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setMapOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" className="rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white">{editingMapId ? "Save changes" : "Publish map"}</button></div></form></div>}

    {listingOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"><form onSubmit={saveListing} className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-primary-700">CITY DIRECTORY LISTING</p><h2 className="mt-1 text-2xl font-bold">{editingListingId ? "Edit listing" : "Add listing"}</h2></div><button type="button" onClick={() => setListingOpen(false)} aria-label="Close listing form"><X className="h-5 w-5 text-slate-400" /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Society/listing name" name="name" value={listingForm.name} onChange={updateListingForm} required /></div><label><span className="mb-1.5 block text-xs font-semibold text-slate-600">City category</span><select name="city" value={listingForm.city} onChange={updateListingForm} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm">{allCities.map((city) => <option key={city}>{city}</option>)}</select></label><label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Alphabet group</span><select name="letter" value={listingForm.letter} onChange={updateListingForm} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm">{["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map((letter) => <option key={letter}>{letter}</option>)}</select></label><label><span className="mb-1.5 block text-xs font-semibold text-slate-600">Status</span><select name="status" value={listingForm.status} onChange={updateListingForm} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"><option>Published</option><option>Draft</option></select></label></div><div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setListingOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" className="rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white">{editingListingId ? "Save listing" : "Add listing"}</button></div></form></div>}
  </>;
}

