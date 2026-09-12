"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, Bell, Building2, ChevronDown, LayoutDashboard, LogOut, MapPin, Menu, Plus, Search, Settings, Users, X } from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Properties", href: "/admin/properties", icon: Building2, badge: "12" },
  { label: "Agents", href: "/admin/agents", icon: Users },
  { label: "Projects", href: "/admin/projects", icon: Building2 },
  { label: "Society Maps", href: "/admin/maps", icon: MapPin },
  { label: "Analytics", href: "/admin", icon: BarChart3 },
  { label: "User Roles", href: "/admin/users", icon: Users },
  { label: "Agency Profile", href: "/agency", icon: Settings },
];

const navigationPermissions = {
  Dashboard: "dashboard",
  Properties: "properties",
  Agents: "agents",
  Projects: "projects",
  "Society Maps": "maps",
  Analytics: "analytics",
  "User Roles": "user_roles",
  "Agency Profile": "agency_profile",
};

function getAccessState() {
  if (typeof window === "undefined") return { role: "super_admin", permissions: {}, suspended: false };
  try {
    const session = JSON.parse(window.localStorage.getItem("nayizameen-session") || "null");
    const users = JSON.parse(window.localStorage.getItem("nayizameen-admin-users") || "[]");
    const permissions = JSON.parse(window.localStorage.getItem("nayizameen-role-permissions") || "{}");
    const assignedUser = users.find((user) => user.email?.toLowerCase() === session?.email?.toLowerCase());
    const savedRole = assignedUser?.role || session?.role || session?.type || "super_admin";
    const role = savedRole === "user" || savedRole === "buyer" ? "customer" : savedRole;
    return { role, permissions, suspended: assignedUser?.status === "suspended" };
  } catch {
    return { role: "super_admin", permissions: {} };
  }
}

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [access, setAccess] = useState(getAccessState);
  useEffect(() => {
    const syncAccess = () => setAccess(getAccessState());
    window.addEventListener("nayizameen-role-permissions-updated", syncAccess);
    return () => window.removeEventListener("nayizameen-role-permissions-updated", syncAccess);
  }, []);
  const visibleNavigation = access.suspended ? [] : access.role === "super_admin" ? navigation : navigation.filter(({ label }) => Boolean(access.permissions?.[access.role]?.[navigationPermissions[label]]));
  const isAgencyDashboard = pathname === "/agency";
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [agencyLogo, setAgencyLogo] = useState(() => { try { return JSON.parse(window.localStorage.getItem("nayizameen-agency-profile") || "null")?.logo || ""; } catch { return ""; } });
  useEffect(() => { const syncAgencyLogo = () => { try { setAgencyLogo(JSON.parse(window.localStorage.getItem("nayizameen-agency-profile") || "null")?.logo || ""); } catch { setAgencyLogo(""); } }; window.addEventListener("nayizameen-agency-profile-updated", syncAgencyLogo); return () => window.removeEventListener("nayizameen-agency-profile-updated", syncAgencyLogo); }, []);
  const logout = () => { window.localStorage.removeItem("nayizameen-session"); setAccountOpen(false); router.push("/login"); };


  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0b1220] text-slate-300 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[104px] items-center border-b border-slate-800 px-7"><Link href={isAgencyDashboard ? "/agency" : "/admin"} className="flex min-w-0 flex-col items-start gap-2"><Image src={isAgencyDashboard && agencyLogo ? agencyLogo : "/logo-horizontal.png"} alt={isAgencyDashboard && agencyLogo ? "Agency logo" : "Nayizameen"} width={145} height={40} unoptimized={Boolean(isAgencyDashboard && agencyLogo)} className="h-7 w-auto max-w-full object-contain brightness-0 invert" /><span className="text-xs font-medium text-slate-500">{isAgencyDashboard ? "Agency Dashboard" : "Admin Dashboard"}</span></Link><button type="button" onClick={() => setOpen(false)} className="ml-auto lg:hidden"><X className="h-5 w-5" /></button></div>
        <nav className="flex-1 space-y-1 px-4 py-6">{visibleNavigation.map(({ label, href, icon: Icon, badge }) => { const active = href === "/admin" ? pathname === href : pathname.startsWith(href); return <Link key={label} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active ? "bg-primary-700 text-white shadow-lg shadow-primary-900/30" : "hover:bg-slate-800 hover:text-white"}`}><Icon className="h-5 w-5" /><span>{label}</span>{badge && <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/20" : "bg-slate-800 text-slate-400"}`}>{badge}</span>}</Link>; })}</nav>
        <div className="m-4 rounded-xl border border-primary-500/30 bg-primary-700/10 p-4"><p className="text-sm font-medium text-white">Manage your listings</p><p className="mt-1 text-xs leading-5 text-slate-400">Publish, update and track every property from one place.</p><Link href="/admin/properties" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-200 hover:text-white"><Plus className="h-4 w-4" /> Add property</Link></div>
      </aside>
      {open && <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}
      <div className="lg:pl-72"><header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-8"><button type="button" onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"><Menu className="h-5 w-5" /></button><div className="relative hidden w-full max-w-md md:block"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input placeholder="Search properties, agents or locations..." className="h-11 w-full rounded-xl bg-slate-100 pl-11 pr-4 text-sm outline-none ring-primary-700 focus:ring-2" /></div><div className="ml-auto flex items-center gap-4"><button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Bell className="h-5 w-5" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" /></button><div className="relative"><button type="button" onClick={() => setAccountOpen((value) => !value)} className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-slate-50" aria-label="Open admin account menu" aria-expanded={accountOpen}><div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">AK</div><span className="hidden text-left text-sm md:block"><span className="block font-medium text-slate-800">Admin User</span><span className="block text-xs text-slate-500">Administrator</span></span><ChevronDown className="h-4 w-4 text-slate-400" /></button>{accountOpen && <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><div className="border-b border-slate-100 px-3 py-2"><p className="text-sm font-semibold text-slate-800">Admin User</p><p className="text-xs text-slate-500">Administrator</p></div><button type="button" onClick={logout} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"><LogOut className="h-4 w-4" />Logout</button></div>}</div></div></header><main className="p-4 md:p-8">{access.suspended ? <section className="rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm"><h1 className="text-xl font-bold text-slate-900">Account suspended</h1><p className="mt-2 text-sm text-slate-500">Please contact a super admin to reactivate your account.</p></section> : children}</main></div>
    </div>
  );
}
