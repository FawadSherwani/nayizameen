"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BarChart3, Building2, CalendarDays, ChevronDown, Eye, FileText, Home, Mail, Menu, MessageSquare, MapPin, Package, Phone, Plus, Search, Settings, ShieldCheck, UserRound, X } from "lucide-react";

function readData(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key) || "null") || fallback;
  } catch {
    return fallback;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(() => readData("nayi-zameen-session", { name: "Demo User", email: "demo.user@nayi-zameen.test", phone: "" }));
  const [properties] = useState(() => readData("nayi-zameen-admin-properties", []));
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");

  const active = properties.filter((property) => property.status === "Published");
  const forSale = active.filter((property) => property.purpose === "For Sale").length;
  const forRent = active.filter((property) => property.purpose === "For Rent").length;
  const saveProfile = (event) => {
    event.preventDefault();
    window.localStorage.setItem("nayi-zameen-session", JSON.stringify({ ...profile, type: "user" }));
    setEditing(false);
    setNotice("Profile updated successfully.");
  };
  const logout = () => {
    window.localStorage.removeItem("nayi-zameen-session");
    router.push("/login");
  };

  const sideLinks = [
    { label: "Overview", icon: Home, active: true },
    { label: "My Listings", icon: Building2, href: "/properties" },
    { label: "Location", icon: MapPin, href: "/profile/post-listing" },
    { label: "Saved Searches", icon: Search },
    { label: "Messages", icon: MessageSquare },
    { label: "Settings", icon: Settings },
  ];

  return <div className="min-h-screen bg-[#f5f7fa] text-slate-900">
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-20 flex-col items-center border-r border-slate-100 bg-white py-5 transition-transform md:w-24 ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <Link href="/" className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-700 text-xs font-extrabold text-white shadow-lg shadow-primary-700/20">NZ</Link>
      <nav className="mt-12 flex flex-1 flex-col items-center gap-3">{sideLinks.map(({ label, icon: Icon, href, active: isActive }) => <Link key={label} href={href || "#"} title={label} className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${isActive ? "bg-primary-50 text-primary-700" : "text-slate-400 hover:bg-slate-50 hover:text-primary-700"}`}><Icon className="h-5 w-5" /></Link>)}</nav>
      <button type="button" onClick={logout} title="Sign out" className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"><ShieldCheck className="h-5 w-5" /></button>
    </aside>
    {menuOpen && <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="fixed inset-0 z-30 bg-slate-900/30 md:hidden" />}
    <div className="md:pl-24">
      <header className="flex h-[68px] items-center justify-between border-b border-slate-100 bg-white px-4 md:px-8"><button type="button" onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-slate-500 md:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button><Link href="/" className="hidden items-center gap-3 md:flex"><Image src="/logo-horizontal.png" alt="Nayi Zameen" width={173} height={25} className="h-8 w-auto" /><span className="border-l border-slate-200 pl-3 text-sm font-medium text-slate-500">My Profile</span></Link><div className="ml-auto flex items-center gap-3"><Link href="/properties" className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-primary-200 hover:text-primary-700 sm:block">Browse listings</Link><Link href="/profile/post-listing" className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-bold text-white hover:bg-primary-800">Post Listing</Link><div className="relative"><button type="button" onClick={() => setProfileOpen((value) => !value)} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 hover:bg-slate-50" aria-expanded={profileOpen}><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">{profile.name?.slice(0, 1).toUpperCase() || "U"}</span><span className="hidden text-left sm:block"><span className="block max-w-28 truncate text-xs font-bold text-slate-700">{profile.name}</span><span className="block text-[10px] text-slate-400">Property seeker</span></span><ChevronDown className="h-4 w-4 text-slate-400" /></button>{profileOpen && <div className="absolute right-0 top-12 z-50 w-44 rounded-xl border border-slate-100 bg-white p-2 shadow-xl"><button type="button" onClick={() => { setEditing(true); setProfileOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-primary-50"><UserRound className="h-4 w-4" />Edit profile</button><button type="button" onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">Sign out</button></div>}</div></div></header>
      <main className="mx-auto max-w-[1500px] p-4 md:p-8">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-bold tracking-wide text-primary-700">ACCOUNT OVERVIEW</p><h1 className="mt-1 text-3xl font-extrabold text-slate-900">Welcome, {profile.name?.split(" ")[0] || "there"}</h1><p className="mt-2 text-sm text-slate-500">Manage your property activity and account from one place.</p></div><span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:inline-flex"><span className="h-2 w-2 rounded-full bg-emerald-500" />Demo account</span></div>
        {notice && <p role="status" className="mb-6 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-800">{notice}</p>}
        <div className="grid gap-5 xl:grid-cols-[1.05fr_1fr]">
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6"><div className="flex items-center justify-between"><h2 className="font-extrabold text-slate-900">Listings</h2><Link href="/properties" className="text-sm font-bold text-primary-700 hover:underline">View all listings</Link></div><div className="mt-7 grid gap-5 sm:grid-cols-[140px_1fr_1fr]"><div className="flex items-center gap-3 border-b border-slate-100 pb-5 sm:border-b-0 sm:border-r sm:pb-0"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Home className="h-5 w-5" /></span><div><p className="text-sm text-slate-500">Active</p><p className="text-xl font-extrabold">{active.length}</p></div></div><div className="grid grid-cols-2 gap-5 sm:col-span-2"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Building2 className="h-4 w-4" /></span><div><p className="text-sm text-slate-500">For Sale</p><p className="font-extrabold">{forSale}</p></div></div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Building2 className="h-4 w-4" /></span><div><p className="text-sm text-slate-500">For Rent</p><p className="font-extrabold">{forRent}</p></div></div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500"><ShieldCheck className="h-4 w-4" /></span><div><p className="text-sm text-slate-500">Saved</p><p className="font-extrabold">0</p></div></div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500"><FileText className="h-4 w-4" /></span><div><p className="text-sm text-slate-500">Enquiries</p><p className="font-extrabold">0</p></div></div></div></div></section>
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6"><div className="flex items-center justify-between"><h2 className="font-extrabold text-slate-900">Quota and credits</h2><button type="button" className="text-sm text-slate-400" aria-label="More quota options">...</button></div><div className="mt-5 flex gap-6 overflow-x-auto border-b border-slate-100 text-sm"><span className="whitespace-nowrap border-b-2 border-primary-700 pb-3 font-bold text-primary-700">Listing quota (0)</span><span className="whitespace-nowrap pb-3 text-slate-500">Refresh credits (0)</span><span className="whitespace-nowrap pb-3 text-slate-500">Hot credits (0)</span></div><div className="mt-6 grid grid-cols-3 gap-4 text-sm"><div><p className="text-slate-500">Available quota</p><p className="mt-1 text-xl font-extrabold">0</p></div><div><p className="text-slate-500">Used</p><p className="mt-1 text-xl font-extrabold">0</p></div><div><p className="text-slate-500">Current plan</p><p className="mt-1 text-xl font-extrabold">-</p></div></div><div className="mt-6 h-2 rounded-full bg-slate-100"><div className="h-2 w-0 rounded-full bg-primary-700" /></div></section>
        </div>
        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="font-extrabold text-slate-900">Analytics</h2><div className="flex items-center gap-2"><span className="rounded-lg bg-primary-700 px-4 py-2 text-xs font-bold text-white">All</span><span className="rounded-lg bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">For Sale</span><span className="rounded-lg bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">For Rent</span><span className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500 sm:flex"><CalendarDays className="h-4 w-4" />Last 30 Days</span></div></div><div className="mt-6 grid gap-4 border-y border-slate-100 py-4 sm:grid-cols-3 lg:grid-cols-6">{[["Views", Eye, "0"], ["Clicks", BarChart3, "0"], ["Leads", Phone, "0"], ["Calls", Phone, "0"], ["WhatsApp", MessageSquare, "0"], ["Emails", Mail, "0"]].map(([label, Icon, value]) => <div key={label} className="flex items-center gap-3 border-slate-100 sm:border-r sm:px-4 last:border-0"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Icon className="h-4 w-4" /></span><div><p className="text-xs text-slate-500">{label}</p><p className="font-extrabold">{value}</p></div></div>)}</div><div className="flex min-h-48 flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-700"><BarChart3 className="h-8 w-8" /></div><h3 className="mt-4 font-extrabold">View in-depth insights</h3><p className="mt-1 text-sm text-slate-500">See the number of views, clicks and leads that your listings have received.</p></div></section>
        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6"><div className="flex items-center justify-between"><h2 className="font-extrabold text-slate-900">My active listings</h2><Link href="/properties" className="text-sm font-bold text-primary-700 hover:underline">View all</Link></div>{active.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center text-center"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-700"><Package className="h-10 w-10" /></div><h3 className="mt-4 text-lg font-extrabold">No active listings</h3><p className="mt-1 text-sm text-slate-500">Your active listings will appear here.</p><Link href="/profile/post-listing" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-800"><Plus className="h-4 w-4" />Post listing</Link></div> : <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{active.slice(0, 6).map((property) => <Link href={"/properties/" + property.id} key={property.id} className="rounded-xl border border-slate-100 p-4 hover:border-primary-200"><p className="font-bold text-slate-800">{property.title}</p><p className="mt-1 text-sm text-slate-500">{property.location}</p><p className="mt-3 text-sm font-bold text-primary-700">{property.price}</p></Link>)}</div>}</section>
        {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"><form onSubmit={saveProfile} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">Edit profile</h2><button type="button" onClick={() => setEditing(false)} aria-label="Close"><X className="h-5 w-5 text-slate-400" /></button></div><label className="mt-6 block"><span className="mb-2 block text-sm font-semibold">Full name</span><input required value={profile.name || ""} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm" /></label><label className="mt-4 block"><span className="mb-2 block text-sm font-semibold">Email</span><input required type="email" value={profile.email || ""} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm" /></label><button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-700 px-4 py-2.5 text-sm font-bold text-white"><SaveIcon />Save changes</button></form></div>}
      </main>
    </div>
  </div>;
}

function SaveIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4 2h10l3 3v13H3V2h1Zm1 2v4h8V4H5Zm0 10v2h10v-2H5Z" /></svg>;
}

