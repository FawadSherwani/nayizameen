import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accessibility, Armchair, Bath, BatteryCharging, BedDouble, Building2, ChevronRight, DoorOpen, Dumbbell, Flame, LampDesk, MapPin, PanelsTopLeft, Phone, Ruler, Shirt, Utensils, UserRound, Waves, Wind, WashingMachine, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const properties = {
  1: { title: "10 Marla Modern House", location: "DHA Phase 6, Lahore", city: "Lahore", price: "PKR 2.75 Crore", type: "House", purpose: "For Sale", beds: 5, baths: 6, area: "10 Marla", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", secondImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" },
  2: { title: "5 Marla Residential Plot", location: "Bahria Town, Karachi", city: "Karachi", price: "PKR 65 Lakh", type: "Plot", purpose: "For Sale", beds: null, baths: null, area: "5 Marla", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80", secondImage: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=900&q=80" },
  3: { title: "2 Bed Luxury Apartment", location: "Bahria Town, Lahore", city: "Lahore", price: "PKR 45,000 / Month", type: "Apartment", purpose: "For Rent", beds: 2, baths: 2, area: "950 Sq. Ft.", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80", secondImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80" },
  4: { title: "1 Kanal Executive House", location: "DHA Phase 5, Islamabad", city: "Islamabad", price: "PKR 4.25 Crore", type: "House", purpose: "For Sale", beds: 6, baths: 6, area: "1 Kanal", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80", secondImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80" },
};

const amenities = [{ label: "Underground Electricity", icon: Zap }, { label: "Double Glazed Windows", icon: PanelsTopLeft }, { label: "Gym", icon: Dumbbell }, { label: "Built-in Wardrobes", icon: Shirt }, { label: "Drawing Room", icon: Armchair }, { label: "Intercom", icon: Phone }, { label: "Central Air Conditioning", icon: Wind }, { label: "Electricity Backup", icon: BatteryCharging }, { label: "Jacuzzi", icon: Waves }, { label: "Central Heating", icon: Flame }, { label: "Facilities for Disabled", icon: Accessibility }, { label: "Kitchen", icon: LampDesk }, { label: "Dining Room", icon: Utensils }, { label: "Flooring", icon: PanelsTopLeft }, { label: "Laundry Room", icon: WashingMachine }, { label: "Entrance from Import", icon: DoorOpen }, { label: "Floors", icon: Building2 }];

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = properties[id] || properties[1];
  if (!property) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6 flex items-center gap-1 text-sm text-gray-500"><Link href="/" className="hover:text-primary-700">Home</Link><ChevronRight className="h-4 w-4" /><Link href="/properties" className="hover:text-primary-700">Properties</Link><ChevronRight className="h-4 w-4" /><span className="truncate text-gray-700">{property.title}</span></div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_340px]">
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative h-64 overflow-hidden rounded-xl sm:h-80"><Image src={property.image} alt={property.title} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /></div>
                <div className="relative h-64 overflow-hidden rounded-xl sm:h-80"><Image src={property.secondImage} alt={`${property.title} view`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /></div>
              </div>
              <section className="mt-8 rounded-xl bg-white p-5 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><span className="rounded bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-700">{property.purpose}</span><h1 className="mt-3 text-2xl font-extrabold text-gray-900 md:text-3xl">{property.title}</h1><p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4 text-primary-700" />{property.location}</p></div></div>
                <h2 className="mt-8 text-xl font-bold text-gray-900">Descriptions</h2>
                <p className="mt-3 leading-7 text-gray-600">A thoughtfully designed {property.type.toLowerCase()} in a prime location. This verified listing offers a comfortable layout, quality finishes, and convenient access to everyday amenities.</p>
                <h2 className="mt-8 text-xl font-bold text-gray-900">Amenities</h2>
                <div className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2 md:grid-cols-3">{amenities.map(({ label, icon: Icon }) => <div key={label} className="flex items-center gap-2 text-sm text-gray-600"><Icon className="h-4 w-4 shrink-0 text-primary-700" />{label}</div>)}</div>
              </section>
              <section className="mt-6 overflow-hidden rounded-xl bg-white p-5 md:p-7"><h2 className="text-xl font-bold text-gray-900">Extra Detailing</h2><div className="mt-4 overflow-hidden rounded-lg border border-gray-100"><iframe title="Property location map" src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`} className="h-72 w-full border-0" loading="lazy" /></div></section>
            </div>
            <aside className="space-y-5">
              <section className="rounded-xl bg-white p-5"><h2 className="text-lg font-bold text-gray-900">Property Overview</h2><dl className="mt-4 divide-y divide-gray-100 text-sm"><div className="flex justify-between py-3"><dt className="text-gray-500">Location</dt><dd className="font-semibold text-gray-800">{property.city}</dd></div><div className="flex justify-between py-3"><dt className="text-gray-500">Type</dt><dd className="font-semibold text-gray-800">{property.type}</dd></div><div className="flex justify-between py-3"><dt className="text-gray-500">Purpose</dt><dd className="font-semibold text-gray-800">{property.purpose}</dd></div><div className="flex justify-between py-3"><dt className="text-gray-500">Built-Up Area</dt><dd className="font-semibold text-gray-800">{property.area}</dd></div></dl><div className="mt-4 flex gap-4 border-t border-gray-100 pt-4 text-sm text-gray-600">{property.beds && <span className="flex items-center gap-1"><BedDouble className="h-4 w-4 text-primary-700" />{property.beds} Beds</span>}{property.baths && <span className="flex items-center gap-1"><Bath className="h-4 w-4 text-primary-700" />{property.baths} Baths</span>}<span className="flex items-center gap-1"><Ruler className="h-4 w-4 text-primary-700" />{property.area}</span></div></section>
              <section className="rounded-xl bg-white p-5"><p className="text-sm text-gray-500">Price</p><p className="mt-1 text-2xl font-extrabold text-primary-700">{property.price}</p><button type="button" className="mt-4 w-full rounded-lg bg-primary-700 px-4 py-3 text-sm font-bold text-white hover:bg-primary-800">Buy Property <span aria-hidden="true">&rarr;</span></button></section>
              <section className="rounded-xl bg-white p-5"><h2 className="text-lg font-bold text-gray-900">Property Agents</h2><div className="mt-4 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50"><UserRound className="h-6 w-6 text-primary-700" /></div><div><Link href="/agents/ahmed-khan" className="text-sm font-bold text-gray-900 hover:text-primary-700">Ahmed Khan</Link><p className="text-xs text-gray-500">Senior Property Consultant</p></div></div><Link href="/agents/ahmed-khan" className="mt-5 block w-full rounded-lg border border-primary-700 px-4 py-2.5 text-center text-sm font-bold text-primary-700 hover:bg-primary-50">View Agent <span aria-hidden="true">&rarr;</span></Link></section>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}