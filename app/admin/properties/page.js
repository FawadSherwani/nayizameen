"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Edit3, Eye, MapPin, MoreHorizontal, Plus, Search, SlidersHorizontal, Trash2, X } from "lucide-react";

const starterProperties = [
  { id: 1, title: "10 Marla Modern House", location: "DHA Phase 6, Lahore", type: "House", purpose: "For Sale", price: "PKR 2.75 Crore", area: "10 Marla", beds: 5, baths: 6, status: "Published", views: 482, description: "A modern family home in a prime location.", image: "" },
  { id: 2, title: "5 Marla Residential Plot", location: "Bahria Town, Karachi", type: "Plot", purpose: "For Sale", price: "PKR 65 Lakh", area: "5 Marla", beds: "", baths: "", status: "Published", views: 361, description: "A verified residential plot.", image: "" },
  { id: 3, title: "2 Bed Luxury Apartment", location: "Bahria Town, Lahore", type: "Apartment", purpose: "For Rent", price: "PKR 45,000 / Month", area: "950 Sq. Ft.", beds: 2, baths: 2, status: "Pending", views: 194, description: "A bright apartment with convenient access.", image: "" },
  { id: 4, title: "1 Kanal Executive House", location: "DHA Phase 5, Islamabad", type: "House", purpose: "For Sale", price: "PKR 4.25 Crore", area: "1 Kanal", beds: 6, baths: 6, status: "Published", views: 550, description: "An executive home with spacious rooms.", image: "" },
  { id: 5, title: "8 Marla Corner Plot", location: "Park View City, Lahore", type: "Plot", purpose: "For Sale", price: "PKR 1.15 Crore", area: "8 Marla", beds: "", baths: "", status: "Draft", views: 0, description: "A corner plot for residential development.", image: "" },
  { id: 6, title: "3 Bed Family Apartment", location: "Gulberg, Lahore", type: "Apartment", purpose: "For Rent", price: "PKR 85,000 / Month", area: "1,550 Sq. Ft.", beds: 3, baths: 3, status: "Published", views: 287, description: "A comfortable apartment for a family.", image: "" },
];

const emptyForm = { title: "", location: "", type: "House", purpose: "For Sale", price: "", area: "", beds: "", baths: "", status: "Draft", description: "", image: "", gallery: [] };

function FormField({ label, name, value, onChange, type = "text", required = false, placeholder }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span><input name={name} value={value} onChange={onChange} type={type} required={required} placeholder={placeholder} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /></label>;
}

function statusClass(status) {
  return status === "Published" ? "bg-emerald-50 text-emerald-700" : status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600";
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState(() => {
    if (typeof window === "undefined") return starterProperties;
    try { return JSON.parse(window.localStorage.getItem("nayi-zameen-admin-properties")) || starterProperties; } catch { return starterProperties; }
  });
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [notice, setNotice] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { window.localStorage.setItem("nayi-zameen-admin-properties", JSON.stringify(properties)); }, [properties]);

  const filtered = useMemo(() => properties.filter((property) => {
    const text = (property.title + " " + property.location + " " + property.type).toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "All" || property.status === status);
  }), [properties, query, status]);

  const notify = (message) => { setNotice(message); window.setTimeout(() => setNotice(""), 2500); };
  const openCreate = () => { setEditingId(null); setForm(emptyForm); setFormOpen(true); };
  const openEdit = (property) => { setEditingId(property.id); setForm({ ...emptyForm, ...property }); setFormOpen(true); };
  const updateForm = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const validFiles = files.filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024);
    if (validFiles.length !== files.length) notify("Only image files smaller than 5MB can be uploaded.");
    if (!validFiles.length) return;
    const images = await Promise.all(validFiles.map((file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    })));
    setForm((current) => ({ ...current, image: current.image || images[0], gallery: [...(current.gallery || []), ...images] }));
    event.target.value = "";
  };
  const removeGalleryImage = (index) => setForm((current) => {
    const gallery = (current.gallery || []).filter((_, imageIndex) => imageIndex !== index);
    return { ...current, gallery, image: gallery[0] || "" };
  });  const saveProperty = (event) => {
    event.preventDefault();
    const property = { ...form, id: editingId || Date.now(), views: editingId ? properties.find((item) => item.id === editingId)?.views || 0 : 0 };
    setProperties((current) => editingId ? current.map((item) => item.id === editingId ? property : item) : [property, ...current]);
    setFormOpen(false);
    notify(editingId ? "Property updated successfully." : "Property added to your listings.");
  };
  const deleteProperty = (property) => {
    if (!window.confirm('Delete ' + property.title + '?')) return;
    setProperties((current) => current.filter((item) => item.id !== property.id));
    notify("Property deleted.");
  };

  return <>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-primary-700">LISTING MANAGEMENT</p><h1 className="mt-1 text-3xl font-extrabold text-slate-900">Properties</h1><p className="mt-2 text-sm text-slate-500">Create, review and publish your portal listings.</p></div><button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary-700/20 hover:bg-primary-800"><Plus className="h-4 w-4" />Add Property</button></div>
    {notice && <div role="status" className="mt-5 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-800">{notice}</div>}
    <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="flex flex-wrap gap-3"><label className="flex h-11 min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, location or type..." className="w-full bg-transparent text-sm outline-none" /></label><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none"><option>All</option><option>Published</option><option>Pending</option><option>Draft</option></select><button type="button" onClick={() => { setQuery(""); setStatus("All"); }} className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"><SlidersHorizontal className="h-4 w-4" />Clear filters</button></div>
      <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="border-y border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-400"><tr><th className="px-4 py-3 font-semibold">Property</th><th className="px-4 py-3 font-semibold">Purpose</th><th className="px-4 py-3 font-semibold">Price</th><th className="px-4 py-3 font-semibold">Views</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold text-right">Actions</th></tr></thead><tbody>{filtered.map((property) => <tr key={property.id} className="border-b border-slate-100 last:border-0"><td className="px-4 py-4"><p className="font-bold text-slate-800">{property.title}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3" />{property.location} · {property.type} · {property.area || "Area not set"}</p></td><td className="px-4 py-4 text-slate-600">{property.purpose}</td><td className="px-4 py-4 font-semibold text-slate-800">{property.price}</td><td className="px-4 py-4 text-slate-600">{property.views}</td><td className="px-4 py-4"><span className={"rounded-full px-2.5 py-1 text-xs font-bold " + statusClass(property.status)}>{property.status}</span></td><td className="px-4 py-4"><div className="flex items-center justify-end gap-1"><Link href={"/properties/" + property.id} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-700" aria-label="View property"><Eye className="h-4 w-4" /></Link><button type="button" onClick={() => openEdit(property)} className="rounded-lg p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-700" aria-label={"Edit " + property.title}><Edit3 className="h-4 w-4" /></button><button type="button" onClick={() => deleteProperty(property)} className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600" aria-label={"Delete " + property.title}><Trash2 className="h-4 w-4" /></button><button type="button" onClick={() => notify(property.title + " has " + property.views + " views.")} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="More options"><MoreHorizontal className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></div>{filtered.length === 0 && <p className="py-12 text-center text-sm text-slate-500">No properties match your search.</p>}<p className="mt-4 text-xs text-slate-400">Showing {filtered.length} of {properties.length} listings. Changes are saved in this browser.</p>
    </section>
    {formOpen && <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 md:items-center"><form onSubmit={saveProperty} className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-primary-700">LISTING DETAILS</p><h2 className="mt-1 text-2xl font-extrabold text-slate-900">{editingId ? "Edit property" : "Add new property"}</h2><p className="mt-2 text-sm text-slate-500">Complete the fields below to manage this listing.</p></div><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close property form"><X className="h-5 w-5" /></button></div><div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><FormField label="Property title" name="title" value={form.title} onChange={updateForm} required placeholder="e.g. 10 Marla Modern House" /></div><FormField label="Location" name="location" value={form.location} onChange={updateForm} required placeholder="e.g. DHA Phase 6, Lahore" /><FormField label="Price" name="price" value={form.price} onChange={updateForm} required placeholder="e.g. PKR 2.75 Crore" /><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Property type</span><select name="type" value={form.type} onChange={updateForm} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary-700"><option>House</option><option>Apartment</option><option>Plot</option><option>Commercial</option></select></label><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Purpose</span><select name="purpose" value={form.purpose} onChange={updateForm} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary-700"><option>For Sale</option><option>For Rent</option></select></label><FormField label="Area" name="area" value={form.area} onChange={updateForm} required placeholder="e.g. 10 Marla" /><FormField label="Bedrooms" name="beds" value={form.beds} onChange={updateForm} type="number" placeholder="Optional" /><FormField label="Bathrooms" name="baths" value={form.baths} onChange={updateForm} type="number" placeholder="Optional" /><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Status</span><select name="status" value={form.status} onChange={updateForm} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary-700"><option>Draft</option><option>Pending</option><option>Published</option></select></label><div className="sm:col-span-2"><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Property gallery</span><input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={handleImageChange} className="block w-full rounded-lg border border-slate-200 bg-white text-sm text-slate-500 file:mr-4 file:border-0 file:bg-primary-50 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-primary-700 hover:file:bg-primary-100" /><p className="mt-2 text-xs text-slate-400">Select multiple images. The first image is used as the main listing image. Each file must be smaller than 5MB.</p>{form.gallery?.length > 0 && <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{form.gallery.map((image, index) => <div key={image} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50"><div className="h-24 bg-cover bg-center" style={{ backgroundImage: "url(" + image + ")" }} role="img" aria-label={"Property gallery image " + (index + 1)} /><span className="absolute left-1.5 top-1.5 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">{index === 0 ? "Main" : index + 1}</span><button type="button" onClick={() => removeGalleryImage(index)} className="absolute right-1.5 top-1.5 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-rose-600 opacity-0 transition group-hover:opacity-100">Remove</button></div>)}</div>}</label></div><label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Description</span><textarea name="description" value={form.description} onChange={updateForm} rows="4" placeholder="Describe the property..." className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /></label></div><div className="mt-7 flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={() => setFormOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-800">{editingId ? "Save changes" : "Add property"}</button></div></form></div>}
  </>;
}
