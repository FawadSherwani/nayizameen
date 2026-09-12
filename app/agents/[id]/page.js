import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Mail, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { agents, allProperties } from "@/lib/data";

export function generateStaticParams() { return agents.map((agent) => ({ id: agent.id })); }

export default async function AgentDetailPage({ params }) {
  const { id } = await params;
  const agent = agents.find((item) => item.id === id);
  if (!agent) notFound();
  const listings = allProperties.slice(0, 3);

  return <>
    <Navbar />
    <main className="min-h-screen bg-gray-50">
      <section className="bg-primary-800 py-10 text-white md:py-14"><div className="mx-auto max-w-5xl px-4 md:px-6"><Link href="/agents" className="inline-flex items-center gap-2 text-sm font-medium text-primary-100 hover:text-white"><ArrowLeft className="h-4 w-4" />All agents</Link></div></section>
      <section className="mx-auto -mt-8 max-w-5xl px-4 pb-16 md:px-6"><div className="rounded-2xl bg-white p-6 shadow-lg md:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-primary-50"><Image src={agent.avatar} alt={agent.name} fill sizes="128px" className="object-cover" /></div><div><span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary-700"><ShieldCheck className="h-4 w-4" /> Verified agent</span><h1 className="mt-2 text-3xl font-bold text-gray-900">{agent.name}</h1><p className="mt-1 text-primary-700">{agent.role}</p><p className="mt-3 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4" />{agent.location}</p></div><div className="sm:ml-auto"><div className="flex items-center gap-1 text-sm font-semibold text-accent-700"><Star className="h-4 w-4 fill-current" /> 4.9 rating</div><p className="mt-1 text-sm text-gray-500">{agent.listings} active listings</p></div></div><div className="mt-8 grid gap-4 border-y border-gray-100 py-5 text-sm text-gray-600 sm:grid-cols-3"><span className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-primary-700" />{agent.experience} experience</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary-700" />Verified advisor</span><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-700" />Serving {agent.location}</span></div><div className="grid gap-8 pt-7 md:grid-cols-[1fr_280px]"><div><h2 className="text-xl font-semibold text-gray-900">About {agent.name.split(" ")[0]}</h2><p className="mt-3 leading-7 text-gray-600">{agent.bio}</p><h2 className="mt-8 text-xl font-semibold text-gray-900">Specialties</h2><div className="mt-3 flex flex-wrap gap-2">{agent.specialties.map((item) => <span key={item} className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700">{item}</span>)}</div></div><div className="rounded-xl bg-primary-50 p-5"><h2 className="font-semibold text-gray-900">Contact agent</h2><a href={"tel:" + agent.phone.replaceAll(" ", "")} className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-700"><Phone className="h-4 w-4" />{agent.phone}</a><a href={"mailto:" + agent.email} className="mt-3 flex items-center gap-2 text-sm font-medium text-primary-700"><Mail className="h-4 w-4" />Email agent</a><Link href="/login" className="mt-5 flex items-center justify-center rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-800">Send enquiry</Link></div></div></div><div className="mt-8"><h2 className="text-2xl font-semibold text-gray-900">Featured listings</h2><div className="mt-4 grid gap-5 sm:grid-cols-3">{listings.map((property) => <Link href={"/properties/" + property.id} key={property.id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"><div className="relative h-36"><Image src={property.image} alt={property.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" /></div><div className="p-4"><p className="text-sm font-semibold text-primary-700">{property.price}</p><p className="mt-1 truncate text-sm font-medium text-gray-900">{property.title}</p></div></Link>)}</div></div></section>
    </main>
    <Footer />
  </>;
}
