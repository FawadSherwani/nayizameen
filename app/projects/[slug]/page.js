import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, GraduationCap, MapPin, Phone, Ruler, Route, ShieldCheck, Store, Trees } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { featuredProjects } from "@/lib/data";

const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const details = {
  "etihad-town-phase-ii": { description: "A thoughtfully planned residential community designed for comfortable family living and long-term value, with easy access to Raiwind Road and Lahore's growing southern corridor.", features: ["Gated community", "Parks and green spaces", "Wide carpeted roads", "Commercial areas nearby"] },
  "bahria-town-karachi-2": { description: "A vibrant master-planned community offering modern homes, amenities, and a connected lifestyle in one of Karachi's most sought-after development zones.", features: ["Secure neighbourhood", "Schools and healthcare", "Retail and dining", "Parks and recreational spaces"] },
  "lahore-smart-city": { description: "A premium smart community bringing contemporary planning, green spaces, and a connected lifestyle together for families and forward-looking investors.", features: ["Smart infrastructure", "Overseas block", "Sports facilities", "Education district"] },
  "capital-smart-city": { description: "An ambitious destination near Islamabad and Rawalpindi, offering a future-ready community with flexible residential and investment options.", features: ["Smart utilities", "Golf course", "Health and education facilities", "Dedicated commercial zones"] },
};

const featureIcons = {
  "Gated community": ShieldCheck,
  "Parks and green spaces": Trees,
  "Wide carpeted roads": Route,
  "Commercial areas nearby": Store,
  "Secure neighbourhood": ShieldCheck,
  "Schools and healthcare": GraduationCap,
  "Retail and dining": Store,
  "Parks and recreational spaces": Trees,
  "Smart infrastructure": Building2,
  "Overseas block": Building2,
  "Sports facilities": Trees,
  "Education district": GraduationCap,
  "Smart utilities": Building2,
  "Golf course": Trees,
  "Health and education facilities": GraduationCap,
  "Dedicated commercial zones": Store,
};
export function generateStaticParams() { return featuredProjects.map((project) => ({ slug: slugify(project.title) })); }

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => slugify(item.title) === slug);
  if (!project) notFound();
  const detail = details[slug] || details["etihad-town-phase-ii"];

  return <>
    <Navbar />
    <main className="bg-gray-50">
      <section className="relative h-72 overflow-hidden md:h-96"><Image src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 text-white md:px-6 md:pb-12"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wider">{project.badge}</span><h1 className="mt-3 text-3xl font-bold md:text-5xl">{project.title}</h1><p className="mt-2 flex items-center gap-1.5 text-primary-100"><MapPin className="h-4 w-4" />{project.location}</p></div></section>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div><Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:underline"><ArrowLeft className="h-4 w-4" />All projects</Link><section className="rounded-2xl bg-white p-6 md:p-8"><p className="text-sm font-semibold tracking-wider text-primary-700">ABOUT THE PROJECT</p><h2 className="mt-2 text-2xl font-semibold text-gray-900">A better way to plan your future</h2><p className="mt-4 leading-8 text-gray-600">{detail.description}</p><h3 className="mt-8 text-lg font-semibold text-gray-900">Project highlights</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{detail.features.map((feature) => <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">{(() => { const Icon = featureIcons[feature] || Building2; return <Icon className="h-5 w-5 shrink-0 text-primary-700" />; })()}{feature}</div>)}</div></section></div>
        <aside className="space-y-5"><section className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm text-gray-500">Starting from</p><p className="mt-1 text-2xl font-bold text-primary-700">{project.price}</p><div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600"><p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-700" />{project.location}</p><p className="flex items-center gap-2"><Ruler className="h-4 w-4 text-primary-700" />Residential and investment plots</p><p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary-700" />Verified project information</p></div><Link href="/login" className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-800">Register interest <ArrowLeft className="h-4 w-4 rotate-180" /></Link></section><section className="rounded-2xl bg-primary-800 p-6 text-white"><Phone className="h-6 w-6 text-primary-100" /><h2 className="mt-4 text-lg font-semibold">Need help choosing?</h2><p className="mt-2 text-sm leading-6 text-primary-100">Speak with a Nayizameen property advisor about this project.</p><button type="button" className="mt-5 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primary-800">Contact an advisor</button></section></aside>
      </div>
    </main>
    <Footer />
  </>;
}
