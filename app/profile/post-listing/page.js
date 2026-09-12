"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Check, FileText, Home, ImagePlus, MapPin, MessageSquare, Phone, Save, Search, Settings, Tag, Upload, X } from "lucide-react";

const initialForm = {
  purpose: "For Sale",
  category: "Home",
  type: "House",
  city: "",
  location: "",
  area: "",
  areaUnit: "Sq. Ft.",
  price: "",
  title: "",
  description: "",
  beds: "",
  baths: "",
  amenities: [],
  images: [],
  email: "",
  phone: "",
  readyPossession: false,
  installments: false,
};

const propertyTypes = { Home: ["House", "Flat", "Upper Portion", "Lower Portion", "Farm House", "Room", "Penthouse"], Plots: ["Residential Plot", "Commercial Plot", "Agricultural Land"], Commercial: ["Office", "Shop", "Warehouse", "Building"] };
const amenityOptions = ["Parking Spaces", "Central Air Conditioning", "Security", "Electricity Backup", "Swimming Pool", "Servant Quarters", "Water Supply", "Gas"];
const inputClass = "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100";

async function readImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const preview = new window.Image();
      preview.onload = () => {
        const maxSize = 1600;
        const scale = Math.min(1, maxSize / Math.max(preview.width, preview.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(preview.width * scale));
        canvas.height = Math.max(1, Math.round(preview.height * scale));
        canvas.getContext("2d").drawImage(preview, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      preview.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function Section({ id, icon: Icon, title, children }) {
  return <section id={id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7"><div className="grid gap-6 md:grid-cols-[150px_1fr]"><div><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Icon className="h-5 w-5" /></span><h2 className="mt-3 text-sm font-bold text-slate-800">{title}</h2></div><div>{children}</div></div></section>;
}

function Field({ label, children }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>{children}</label>;
}

export default function PostListingPage() {
  const router = useRouter();
  const [editId, setEditId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    setEditId(new URLSearchParams(window.location.search).get("edit"));
  }, []);

  useEffect(() => {
    if (!editId) return;
    try {
      const property = JSON.parse(window.localStorage.getItem("nayizameen-admin-properties") || "[]").find((item) => String(item.id) === String(editId));
      if (!property) return;
      const areaValue = String(property.area || "");
      const areaUnit = ["Sq. Ft.", "Marla", "Kanal"].find((unit) => areaValue.endsWith(unit)) || initialForm.areaUnit;
      setEditingId(String(property.id));
      setForm({ ...initialForm, purpose: property.purpose || initialForm.purpose, category: property.category || initialForm.category, type: property.type || initialForm.type, city: property.city || "", location: property.location || "", area: areaValue.replace(" " + areaUnit, ""), areaUnit, price: property.price || "", title: property.title || "", description: property.description || "", beds: property.beds || "", baths: property.baths || "", amenities: property.amenities || [], images: property.gallery || (property.image ? [property.image] : []), email: property.email || "", phone: property.phone || "", readyPossession: Boolean(property.readyPossession), installments: Boolean(property.installments) });
    } catch {
      setNotice("This listing could not be loaded for editing.");
    }
  }, [editId]);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const toggleAmenity = (amenity) => setForm((current) => ({ ...current, amenities: current.amenities.includes(amenity) ? current.amenities.filter((item) => item !== amenity) : [...current.amenities, amenity] }));
  const addImages = async (event) => {
    const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024);
    const images = await Promise.all(files.map(readImage));
    setForm((current) => ({ ...current, images: [...current.images, ...images] }));
    event.target.value = "";
  };
  const removeImage = (index) => setForm((current) => ({ ...current, images: current.images.filter((_, itemIndex) => itemIndex !== index) }));

  const submit = async (event) => {
    event.preventDefault();
    try {
      const saved = JSON.parse(window.localStorage.getItem("nayizameen-admin-properties") || "[]");
      const property = {
        id: editingId || Date.now(),
        title: form.title,
        location: [form.location, form.city].filter(Boolean).join(", "),
        city: form.city,
        type: form.type,
        purpose: form.purpose,
        price: form.price,
        area: form.area + (form.area ? " " + form.areaUnit : ""),
        beds: form.beds,
        baths: form.baths,
        description: form.description,
        image: form.images[0] || "",
        gallery: form.images,
        badge: "New",
        status: "Published",
        views: 0,
        amenities: form.amenities,
        email: form.email,
        phone: form.phone,
        ownerId: JSON.parse(window.localStorage.getItem("nayizameen-session") || "null")?.email || "demo-user",
      };
      const nextProperties = editingId ? saved.map((item) => String(item.id) === String(editingId) ? { ...item, ...property, id: item.id } : item) : [property, ...saved];
      window.localStorage.setItem("nayizameen-admin-properties", JSON.stringify(nextProperties));
      window.dispatchEvent(new Event("nayizameen-properties-updated"));
      try {
        await fetch("/api/properties", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingId ? nextProperties.find((item) => String(item.id) === String(editingId)) : property) });
      } catch {
        // Keep the local demo listing if the shared API is unavailable.
      }
      setNotice(editingId ? "Your listing was updated successfully." : "Your listing was posted successfully.");
      window.setTimeout(() => router.push("/profile"), 700);
    } catch {
      setNotice("Your listing could not be saved. Please remove an image or use smaller files and try again.");
    }
  };

  return <div className="min-h-screen bg-[#f5f7fa] text-slate-900">    <aside className="fixed inset-y-0 left-0 z-40 flex w-20 flex-col items-center border-r border-slate-100 bg-white py-5 md:w-24">
      <Link href="/profile" className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-700 text-xs font-bold text-white shadow-lg shadow-primary-700/20">NZ</Link>
      <nav className="mt-12 flex flex-1 flex-col items-center gap-3">
        <Link href="/profile" title="Overview" className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary-700"><Home className="h-5 w-5" /></Link>
        <Link href="/profile" title="Property Management" className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary-700"><Building2 className="h-5 w-5" /></Link>
        <Link href="/profile/post-listing" title="Location" className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><MapPin className="h-5 w-5" /></Link>
        <Link href="#" title="Saved Searches" className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary-700"><Search className="h-5 w-5" /></Link>
        <Link href="#" title="Messages" className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary-700"><MessageSquare className="h-5 w-5" /></Link>
        <Link href="#" title="Settings" className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary-700"><Settings className="h-5 w-5" /></Link>
      </nav>
    </aside>
    <div className="md:pl-24"><header className="border-b border-slate-100 bg-white"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6"><Link href="/profile" className="flex items-center gap-2 text-sm font-semibold text-primary-700"><ArrowLeft className="h-4 w-4" />Back to profile</Link><div className="hidden items-center gap-2 text-sm font-medium text-slate-500 sm:flex"><Check className="h-4 w-4 text-emerald-500" />Demo listing mode</div></div></header>
    <main className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
      <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7"><p className="text-sm font-semibold tracking-wide text-primary-700">POST A PROPERTY</p><h1 className="mt-2 text-3xl font-bold text-slate-900">{editingId ? "Update your property listing" : "Reach millions of buyers"}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Add your property details below. Your demo listing will be available on the public properties page after submission.</p></div>
      {notice && <p role="status" className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{notice}</p>}
      <form onSubmit={submit} onInvalid={() => setNotice("Please complete the required fields before submitting.")} className="space-y-6">
        <Section id="location" icon={MapPin} title="Location and purpose"><div className="space-y-5"><div><p className="mb-2 text-xs font-semibold text-slate-600">Select purpose</p><div className="flex gap-2"><button type="button" onClick={() => setForm((current) => ({ ...current, purpose: "For Sale" }))} className={"rounded-full px-4 py-2 text-sm font-semibold " + (form.purpose === "For Sale" ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300" : "bg-slate-100 text-slate-500")}>For Sale</button><button type="button" onClick={() => setForm((current) => ({ ...current, purpose: "For Rent" }))} className={"rounded-full px-4 py-2 text-sm font-semibold " + (form.purpose === "For Rent" ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300" : "bg-slate-100 text-slate-500")}>For Rent</button></div></div><div><p className="mb-2 text-xs font-semibold text-slate-600">Select property type</p><div className="flex flex-wrap gap-2">{Object.keys(propertyTypes).map((category) => <button type="button" key={category} onClick={() => setForm((current) => ({ ...current, category, type: propertyTypes[category][0] }))} className={"rounded-lg px-4 py-2 text-sm font-semibold " + (form.category === category ? "bg-primary-700 text-white" : "bg-slate-100 text-slate-600")}>{category}</button>)}</div><div className="mt-3 flex flex-wrap gap-2">{propertyTypes[form.category].map((type) => <button type="button" key={type} onClick={() => setForm((current) => ({ ...current, type }))} className={"rounded-full px-3 py-2 text-xs font-medium " + (form.type === type ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300" : "bg-slate-100 text-slate-600")}>{type}</button>)}</div></div><div className="grid gap-4 sm:grid-cols-2"><Field label="City"><input required name="city" value={form.city} onChange={update} placeholder="Select city" className={inputClass} /></Field><Field label="Location"><input required name="location" value={form.location} onChange={update} placeholder="Search location or area" className={inputClass} /></Field></div><div className="flex h-24 items-center justify-center rounded-xl bg-slate-100 text-primary-700"><MapPin className="h-7 w-7" /><span className="ml-2 text-sm font-medium">Map location preview</span></div></div></Section>
        <Section icon={Tag} title="Price and area"><div className="grid gap-4 sm:grid-cols-2"><Field label="Area size"><div className="flex gap-2"><input name="area" value={form.area} onChange={update} placeholder="Enter area" className={inputClass + " flex-1"} /><select name="areaUnit" value={form.areaUnit} onChange={update} className={inputClass + " w-28 px-2"}><option>Sq. Ft.</option><option>Marla</option><option>Kanal</option></select></div></Field><Field label="Price"><input required name="price" value={form.price} onChange={update} placeholder="e.g. PKR 2.75 Crore" className={inputClass} /></Field></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><label className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm"><span><span className="block font-semibold">Installment available</span><span className="text-xs text-slate-500">Enable if listing is available on installments</span></span><input type="checkbox" name="installments" checked={form.installments} onChange={(event) => setForm((current) => ({ ...current, installments: event.target.checked }))} className="h-4 w-4 accent-primary-700" /></label><label className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm"><span><span className="block font-semibold">Ready for possession</span><span className="text-xs text-slate-500">Show this property as ready</span></span><input type="checkbox" name="readyPossession" checked={form.readyPossession} onChange={(event) => setForm((current) => ({ ...current, readyPossession: event.target.checked }))} className="h-4 w-4 accent-primary-700" /></label></div></Section>
        <Section icon={Home} title="Features and amenities"><div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><Field label="Bedrooms"><div className="flex flex-wrap gap-2">{["Studio", 1, 2, 3, 4, 5, "6+"].map((value) => <button type="button" key={value} onClick={() => setForm((current) => ({ ...current, beds: value === "Studio" ? "" : value }))} className={"rounded-full px-3 py-2 text-xs font-semibold " + (String(form.beds) === String(value) || (value === "Studio" && !form.beds) ? "bg-primary-100 text-primary-700" : "bg-slate-100 text-slate-600")}>{value}</button>)}</div></Field><Field label="Bathrooms"><div className="flex flex-wrap gap-2">{[1, 2, 3, 4, 5, "6+"].map((value) => <button type="button" key={value} onClick={() => setForm((current) => ({ ...current, baths: value }))} className={"rounded-full px-3 py-2 text-xs font-semibold " + (String(form.baths) === String(value) ? "bg-primary-100 text-primary-700" : "bg-slate-100 text-slate-600")}>{value}</button>)}</div></Field></div><div><p className="mb-2 text-xs font-semibold text-slate-600">Feature and amenities</p><div className="flex flex-wrap gap-2">{amenityOptions.map((amenity) => <button type="button" key={amenity} onClick={() => toggleAmenity(amenity)} className={"rounded-full px-3 py-2 text-xs font-medium " + (form.amenities.includes(amenity) ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300" : "bg-slate-100 text-slate-600")}>{amenity}</button>)}</div></div></div></Section>
        <Section icon={FileText} title="Ad information"><div className="space-y-4"><Field label="Title"><input required name="title" value={form.title} onChange={update} placeholder="Beautiful house in DHA Phase 5" className={inputClass} /></Field><Field label="Description"><textarea required name="description" value={form.description} onChange={update} rows="5" placeholder="Describe your property's features, area and location." className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /></Field></div></Section>
        <Section icon={ImagePlus} title="Property images and videos"><div><label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary-300 bg-primary-50/40 px-5 py-8 text-center"><Upload className="h-7 w-7 text-primary-700" /><span className="mt-2 text-sm font-semibold text-primary-700">Upload images</span><span className="mt-1 text-xs text-slate-500">Add multiple JPG, PNG or WEBP images, maximum 5MB each.</span><input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={addImages} className="sr-only" /></label>{form.images.length > 0 && <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{form.images.map((image, index) => <div key={image} className="group relative overflow-hidden rounded-xl border border-slate-200"><Image src={image} alt={"Property image " + (index + 1)} width={400} height={112} unoptimized className="h-28 w-full object-cover" /><span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold">{index === 0 ? "Cover" : index + 1}</span><button type="button" onClick={() => removeImage(index)} className="absolute right-2 top-2 rounded bg-white/90 p-1 text-rose-600 opacity-0 group-hover:opacity-100" aria-label="Remove image"><X className="h-4 w-4" /></button></div>)}</div>}</div></Section>
        <Section icon={Phone} title="Contact information"><div className="grid gap-4 sm:grid-cols-2"><Field label="Email"><input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" className={inputClass} /></Field><Field label="Mobile"><input required type="tel" name="phone" value={form.phone} onChange={update} placeholder="+92 300 0000000" className={inputClass} /></Field></div></Section>
        <Section icon={Building2} title="Platform selection"><label className="flex items-center gap-3 rounded-xl border border-primary-300 bg-primary-50 p-4 text-sm font-semibold text-primary-800"><input type="checkbox" defaultChecked className="h-4 w-4 accent-primary-700" />Publish on Nayizameen</label></Section>
        <div className="flex justify-end gap-3 pb-8"><Link href="/profile" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600">Cancel</Link><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-700/20 hover:bg-primary-800"><Save className="h-4 w-4" />{editingId ? "Update listing" : "Submit listing"}</button></div>
      </form>
    </main>
  </div></div>;
}

