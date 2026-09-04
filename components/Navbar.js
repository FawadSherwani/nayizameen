"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Buy", href: "/properties" },
  { label: "Rent", href: "/properties" },
  { label: "Properties", href: "/properties" },
  { label: "Projects", href: "/projects" },
  { label: "Agents", href: "/agents" },
  // { label: "Commercial", href: "#" },
  // { label: "Areas Guide", href: "#" },
  { label: "Plots", href: "/properties" },
];

const resourceLinks = ["Property Trends", "Blogs", "FAQs"];

function getSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem("nayi-zameen-session") || "null");
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [session, setSession] = useState(getSession);

  const logout = () => {
    window.localStorage.removeItem("nayi-zameen-session");
    setSession(null);
    setProfileOpen(false);
  };

  const profileHref = session?.type === "agency" ? "/agency" : "/profile";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center"><Image src="/logo-horizontal.png" alt="Nayi Zameen" width={173} height={25} className="h-8 w-auto md:h-9" priority /></Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-gray-700 lg:flex">
          {navLinks.map((link) => <a key={link.label} href={link.href} className="hover:text-primary-700">{link.label}</a>)}
          <div className="group relative"><button type="button" className="flex items-center gap-1 hover:text-primary-700">Resources <ChevronDown className="h-4 w-4" /></button><div className="absolute left-0 top-full hidden w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg group-hover:block">{resourceLinks.map((item) => <a key={item} href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">{item}</a>)}</div></div>
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          {session ? <div className="relative"><button type="button" onClick={() => setProfileOpen((value) => !value)} className="flex items-center gap-2 rounded-full p-1.5 text-primary-700 hover:bg-primary-50" aria-label="Open profile menu" aria-expanded={profileOpen}><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold">{session.name?.slice(0, 1).toUpperCase() || "U"}</span><span className="hidden max-w-28 truncate text-sm font-semibold text-gray-700 sm:block">{session.name || "Profile"}</span><ChevronDown className="hidden h-4 w-4 sm:block" /></button>{profileOpen && <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl"><div className="border-b border-gray-100 px-3 py-2"><p className="truncate text-sm font-bold text-gray-800">{session.name}</p><p className="text-xs text-gray-500">{session.type === "agency" ? "Agency owner" : "Property seeker"}</p></div><Link href={profileHref} onClick={() => setProfileOpen(false)} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-primary-50"><LayoutDashboard className="h-4 w-4" />{session.type === "agency" ? "Agency dashboard" : "My profile"}</Link><button type="button" onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"><LogOut className="h-4 w-4" />Sign out</button></div>}</div> : <Link href="/login" className="hidden text-sm font-medium text-gray-700 hover:text-primary-700 sm:block">Login</Link>}
          <Link href={session?.type === "agency" ? "/agency" : "/profile/post-listing"} className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700">{session?.type === "agency" ? "Agency dashboard" : "Add Property"}</Link>
          <button type="button" className="lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu">{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
      </div>
      {mobileOpen && <nav className="flex flex-col gap-1 border-t border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 lg:hidden">{navLinks.map((link) => <a key={link.label} href={link.href} className="rounded-lg px-2 py-2 hover:bg-gray-50">{link.label}</a>)}{session ? <><Link href={profileHref} className="rounded-lg px-2 py-2 font-semibold text-primary-700">{session.type === "agency" ? "Agency dashboard" : "My profile"}</Link><button type="button" onClick={logout} className="rounded-lg px-2 py-2 text-left text-rose-600">Sign out</button></> : <Link href="/login" className="rounded-lg px-2 py-2 font-semibold text-primary-700">Login</Link>}</nav>}
    </header>
  );
}

