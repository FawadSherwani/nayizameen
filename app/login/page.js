"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, MapPin, ShieldCheck, UserRound, Building2 } from "lucide-react";
import { useState } from "react";

const demoAccounts = {
  user: { name: "Demo User", email: "demo.user@nayizameen.test", type: "user" },
  agency: { name: "Demo Agency Owner", email: "demo.agency@nayizameen.test", type: "agency" },
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const startDemo = (type) => {
    const account = demoAccounts[type];
    window.localStorage.setItem("nayizameen-session", JSON.stringify(account));
    if (type === "agency" && !window.localStorage.getItem("nayizameen-agency-profile")) {
      window.localStorage.setItem("nayizameen-agency-profile", JSON.stringify({ agencyName: "Demo Agency", email: account.email, contactNumber: "+92 300 0000000", registrationNumber: "DEMO-AGENCY-001", address: "Lahore, Pakistan", bio: "Demo agency account for testing the portal." }));
    }
    router.push(type === "agency" ? "/agency" : "/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email")?.toString() || "Demo User";
    const account = { name: email.split("@")[0].replace(/[._-]/g, " "), email, type: "user" };
    window.localStorage.setItem("nayizameen-session", JSON.stringify(account));
    setMessage("Demo user signed in. Your profile icon is now active.");
    window.setTimeout(() => router.push("/"), 700);
  };

  return <main className="grid min-h-screen bg-white lg:grid-cols-2"><section className="relative hidden overflow-hidden bg-primary-800 p-12 text-white lg:flex lg:flex-col"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,151,179,0.5),_transparent_50%)]" /><Link href="/" className="relative z-10 flex items-center gap-3"><Image src="/logo-horizontal.png" alt="Nayizameen" width={173} height={25} className="h-9 w-auto brightness-0 invert" /><span className="border-l border-white/30 pl-3 text-sm font-medium text-primary-100">Property Portal</span></Link><div className="relative z-10 my-auto max-w-lg"><span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary-100"><ShieldCheck className="h-4 w-4" /> VERIFIED LISTINGS</span><h1 className="mt-6 text-5xl font-bold leading-tight">Your next property is waiting.</h1><p className="mt-5 text-lg leading-8 text-primary-100">Sign in to save your favourite properties, contact verified agents, and manage your listings in one place.</p><div className="mt-10 space-y-4">{["Save properties and searches", "Get alerts for new listings", "Manage your property enquiries"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-medium"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><MapPin className="h-4 w-4 text-primary-100" /></span>{item}</div>)}</div></div><p className="relative z-10 text-sm text-primary-200">(c) 2026 Nayizameen. All rights reserved.</p></section><section className="flex items-center justify-center px-4 py-10 sm:px-8"><div className="w-full max-w-md"><Link href="/" className="mb-10 flex items-center gap-2 lg:hidden"><Image src="/logo-horizontal.png" alt="Nayizameen" width={173} height={25} className="h-9 w-auto" /></Link><p className="text-sm font-semibold tracking-wider text-primary-700">WELCOME BACK</p><h2 className="mt-2 text-3xl font-bold text-gray-900">Sign in to your account</h2><p className="mt-3 text-sm leading-6 text-gray-500">Use a demo account to test the portal without authentication.</p><div className="mt-7 grid grid-cols-2 gap-3"><button type="button" onClick={() => startDemo("user")} className="rounded-xl border border-primary-200 bg-primary-50 p-3 text-left text-sm font-semibold text-primary-800 hover:border-primary-700"><UserRound className="mb-2 h-5 w-5" />Demo user<span className="mt-1 block text-xs font-normal text-gray-500">Browse and save listings</span></button><button type="button" onClick={() => startDemo("agency")} className="rounded-xl border border-primary-200 bg-primary-50 p-3 text-left text-sm font-semibold text-primary-800 hover:border-primary-700"><Building2 className="mb-2 h-5 w-5" />Demo agency<span className="mt-1 block text-xs font-normal text-gray-500">Manage agents and properties</span></button></div><div className="my-6 flex items-center gap-3 text-xs text-gray-400"><span className="h-px flex-1 bg-gray-200" />or sign in with details<span className="h-px flex-1 bg-gray-200" /></div><form onSubmit={handleSubmit} className="space-y-5"><label className="block"><span className="mb-2 block text-sm font-medium text-gray-700">Email address</span><span className="relative block"><Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" /><input type="email" required name="email" placeholder="you@example.com" className="h-12 w-full rounded-xl border border-gray-200 pl-11 pr-4 text-sm outline-none transition focus:border-primary-700 focus:ring-4 focus:ring-primary-50" /></span></label><label className="block"><span className="mb-2 block text-sm font-medium text-gray-700">Password</span><span className="relative block"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" /><input type={showPassword ? "text" : "password"} required name="password" placeholder="Any password for demo mode" className="h-12 w-full rounded-xl border border-gray-200 pl-11 pr-11 text-sm outline-none transition focus:border-primary-700 focus:ring-4 focus:ring-primary-50" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></span></label><button type="submit" className="h-12 w-full rounded-xl bg-primary-700 text-sm font-semibold text-white shadow-lg shadow-primary-700/20 transition hover:bg-primary-800">Sign in in demo mode</button></form>{message && <p role="status" className="mt-5 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-800">{message}</p>}<p className="mt-8 text-center text-sm text-gray-500">Don&apos;t have an account? <Link href="/register" className="font-semibold text-primary-700 hover:underline">Create an account</Link></p><p className="mt-8 text-center text-sm"><Link href="/" className="font-medium text-gray-600 hover:text-primary-700">Back to homepage</Link></p></div></section></main>;
}

