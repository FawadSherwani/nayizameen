"use client";

import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import { agents as defaultAgents } from "@/lib/data";
import { Building2, Check, FileText, Mail, MapPin, Phone, Plus, Save, Trash2, Upload, UserRound } from "lucide-react";

const profileDefaults = {
  agencyName: "Nayi Zameen Properties",
  registrationNumber: "",
  contactNumber: "",
  email: "",
  address: "",
  bio: "A trusted property agency helping families find the right place across Pakistan.",
  logo: "",
  verificationDocument: "",
};

const agentDefaults = { name: "", role: "Property Advisor", location: "", experience: "", listings: 0, phone: "", email: "", avatar: "", specialties: "", bio: "" };
const propertyDefaults = { title: "", location: "", type: "House", purpose: "For Sale", price: "", area: "", beds: "", baths: "", status: "Draft", description: "", image: "", gallery: [] };

function TextField({ label, name, value, onChange, type = "text", placeholder = "", required = false }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span><input name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} required={required} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /></label>;
}

function FileField({ label, accept, onChange, help }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span><span className="flex items-center gap-3 rounded-xl border border-dashed border-primary-200 bg-primary-50/40 px-4 py-3"><Upload className="h-5 w-5 shrink-0 text-primary-700" /><span className="min-w-0 flex-1"><input type="file" accept={accept} onChange={onChange} className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-100 file:px-3 file:py-2 file:text-xs file:font-bold file:text-primary-700" /><span className="mt-1 block text-xs text-slate-400">{help}</span></span></span></label>;
}

async function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

export default function AgencyProfilePage() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("nayi-zameen-agency-profile") || "null");
      return saved ? { ...profileDefaults, ...saved } : profileDefaults;
    } catch {
      return profileDefaults;
    }
  });
  const [agencyAgents, setAgencyAgents] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("nayi-zameen-admin-agents") || "null") || defaultAgents;
    } catch {
      return defaultAgents;
    }
  });
  const [agencyProperties, setAgencyProperties] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("nayi-zameen-admin-properties") || "[]");
    } catch {
      return [];
    }
  });
  const [agentForm, setAgentForm] = useState(agentDefaults);
  const [propertyForm, setPropertyForm] = useState(propertyDefaults);
  const [notice, setNotice] = useState("");
  const notify = (text) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const updateProfile = (event) => setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  const updateAgent = (event) => setAgentForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const updateProperty = (event) => setPropertyForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const saveProfile = (event) => {
    event.preventDefault();
    window.localStorage.setItem("nayi-zameen-agency-profile", JSON.stringify(profile));
    window.dispatchEvent(new Event("nayi-zameen-agency-profile-updated"));
    notify("Agency profile updated.");
  };

  const uploadProfileFile = async (event, field) => {
    const file = event.target.files?.[0];
    if (!file || file.size > 5 * 1024 * 1024) {
      notify("Choose a file smaller than 5MB.");
      return;
    }
    const value = await readFile(file);
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const addAgent = (event) => {
    event.preventDefault();
    const agent = { ...agentForm, id: agentForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(), listings: Number(agentForm.listings) || 0, specialties: agentForm.specialties.split(",").map((item) => item.trim()).filter(Boolean) };
    const next = [agent, ...agencyAgents];
    setAgencyAgents(next);
    window.localStorage.setItem("nayi-zameen-admin-agents", JSON.stringify(next));
    setAgentForm(agentDefaults);
    notify("Agent added to your agency.");
  };

  const removeAgent = (id) => {
    const next = agencyAgents.filter((agent) => agent.id !== id);
    setAgencyAgents(next);
    window.localStorage.setItem("nayi-zameen-admin-agents", JSON.stringify(next));
    notify("Agent removed.");
  };

  const uploadPropertyImage = async (event) => {
    const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024);
    const images = await Promise.all(files.map(readFile));
    setPropertyForm((current) => ({ ...current, image: current.image || images[0] || "", gallery: [...current.gallery, ...images] }));
    event.target.value = "";
  };

  const addProperty = (event) => {
    event.preventDefault();
    const property = { ...propertyForm, id: Date.now(), views: 0 };
    const next = [property, ...agencyProperties];
    setAgencyProperties(next);
    window.localStorage.setItem("nayi-zameen-admin-properties", JSON.stringify(next));
    setPropertyForm(propertyDefaults);
    notify("Property added to your agency listings.");
  };

  const removeProperty = (id) => {
    const next = agencyProperties.filter((property) => property.id !== id);
    setAgencyProperties(next);
    window.localStorage.setItem("nayi-zameen-admin-properties", JSON.stringify(next));
    notify("Property removed.");
  };

  return <AdminShell>
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold tracking-wide text-primary-700">AGENCY OWNER WORKSPACE</p><h1 className="mt-1 text-3xl font-extrabold text-slate-900">Agency profile</h1><p className="mt-2 text-sm text-slate-500">Update your agency and manage the agents and properties shown on Nayi Zameen.</p></div><span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><Check className="h-4 w-4" />Owner account</span></div>
      {notice && <p role="status" className="mt-5 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-800">{notice}</p>}

      <form onSubmit={saveProfile} className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Building2 className="h-5 w-5" /></span><div><h2 className="text-xl font-extrabold text-slate-900">Agency information</h2><p className="text-sm text-slate-500">This information appears on your public agency profile.</p></div></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2"><TextField label="Agency name" name="agencyName" value={profile.agencyName} onChange={updateProfile} required placeholder="Your agency name" /><TextField label="Agency registration number" name="registrationNumber" value={profile.registrationNumber} onChange={updateProfile} required placeholder="e.g. REG-123456" /><TextField label="Agency contact number" name="contactNumber" value={profile.contactNumber} onChange={updateProfile} required placeholder="+92 300 0000000" /><TextField label="Agency email" name="email" value={profile.email} onChange={updateProfile} type="email" required placeholder="agency@example.com" /><label className="block md:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Agency address</span><textarea name="address" value={profile.address} onChange={updateProfile} required rows="3" placeholder="Complete registered agency address" className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /></label><label className="block md:col-span-2"><span className="mb-1.5 block text-xs font-bold text-slate-600">Agency bio</span><textarea name="bio" value={profile.bio} onChange={updateProfile} rows="3" placeholder="Tell clients about your agency" className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /></label><FileField label="Agency logo" accept="image/png,image/jpeg,image/webp" onChange={(event) => uploadProfileFile(event, "logo")} help="PNG, JPG or WEBP. Maximum 5MB." /><FileField label="Government verification document" accept="image/jpeg,image/png,application/pdf" onChange={(event) => uploadProfileFile(event, "verificationDocument")} help="PDF, JPG or PNG. Maximum 5MB." /></div>
        <div className="mt-6 flex justify-end"><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-3 text-sm font-bold text-white hover:bg-primary-800"><Save className="h-4 w-4" />Save profile</button></div>
      </form>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-primary-700">TEAM</p><h2 className="mt-1 text-xl font-extrabold text-slate-900">Your agents</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{agencyAgents.length}</span></div><form onSubmit={addAgent} className="mt-5 space-y-3"><div className="grid gap-3 sm:grid-cols-2"><TextField label="Agent name" name="name" value={agentForm.name} onChange={updateAgent} required placeholder="Full name" /><TextField label="Role" name="role" value={agentForm.role} onChange={updateAgent} required placeholder="Property Advisor" /><TextField label="Location" name="location" value={agentForm.location} onChange={updateAgent} required placeholder="Lahore" /><TextField label="Email" name="email" value={agentForm.email} onChange={updateAgent} type="email" required placeholder="agent@example.com" /><TextField label="Phone" name="phone" value={agentForm.phone} onChange={updateAgent} placeholder="+92 300 0000000" /><TextField label="Experience" name="experience" value={agentForm.experience} onChange={updateAgent} placeholder="5 years" /></div><button type="submit" className="inline-flex items-center gap-2 rounded-xl border border-primary-700 px-4 py-2.5 text-sm font-bold text-primary-700 hover:bg-primary-50"><Plus className="h-4 w-4" />Add agent</button></form><div className="mt-6 space-y-3">{agencyAgents.slice(0, 6).map((agent) => <div key={agent.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"><div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700"><UserRound className="h-4 w-4" /></span><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{agent.name}</p><p className="truncate text-xs text-slate-500">{agent.role} · {agent.location}</p></div></div><button type="button" onClick={() => removeAgent(agent.id)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label={"Remove " + agent.name}><Trash2 className="h-4 w-4" /></button></div>)}</div></section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-primary-700">LISTINGS</p><h2 className="mt-1 text-xl font-extrabold text-slate-900">Your properties</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{agencyProperties.length}</span></div><form onSubmit={addProperty} className="mt-5 space-y-3"><div className="grid gap-3 sm:grid-cols-2"><TextField label="Property title" name="title" value={propertyForm.title} onChange={updateProperty} required placeholder="10 Marla Modern House" /><TextField label="Location" name="location" value={propertyForm.location} onChange={updateProperty} required placeholder="DHA Phase 6, Lahore" /><TextField label="Price" name="price" value={propertyForm.price} onChange={updateProperty} required placeholder="PKR 2.75 Crore" /><TextField label="Area" name="area" value={propertyForm.area} onChange={updateProperty} required placeholder="10 Marla" /><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Type</span><select name="type" value={propertyForm.type} onChange={updateProperty} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"><option>House</option><option>Apartment</option><option>Plot</option><option>Commercial</option></select></label><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Purpose</span><select name="purpose" value={propertyForm.purpose} onChange={updateProperty} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"><option>For Sale</option><option>For Rent</option></select></label></div><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Property gallery</span><input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={uploadPropertyImage} className="block w-full rounded-xl border border-slate-200 bg-white text-xs text-slate-500 file:mr-3 file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:font-bold file:text-primary-700" /><span className="mt-1 block text-xs text-slate-400">{propertyForm.gallery.length} image{propertyForm.gallery.length === 1 ? "" : "s"} selected. First image is the cover.</span></label><button type="submit" className="inline-flex items-center gap-2 rounded-xl border border-primary-700 px-4 py-2.5 text-sm font-bold text-primary-700 hover:bg-primary-50"><Plus className="h-4 w-4" />Add property</button></form><div className="mt-6 space-y-3">{agencyProperties.slice(0, 6).map((property) => <div key={property.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"><div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700"><Building2 className="h-4 w-4" /></span><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{property.title}</p><p className="truncate text-xs text-slate-500">{property.location} · {property.price}</p></div></div><button type="button" onClick={() => removeProperty(property.id)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label={"Remove " + property.title}><Trash2 className="h-4 w-4" /></button></div>)}</div></section>
      </div>
      <p className="mt-6 flex items-center gap-2 text-xs text-slate-400"><FileText className="h-4 w-4" />Uploaded documents are stored locally until authentication and secure file storage are connected.</p>
    </div>
  </AdminShell>;
}

