import Image from "next/image";
import { Phone, MapPin, BookOpen, TrendingUp, Building2, PlayCircle } from "lucide-react";
import { quickLinks, trustedBy } from "@/lib/data";

const iconMap = { MapPin, BookOpen, TrendingUp, Building2, PlayCircle };

export function QuickLinksStrip() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:grid-cols-5">
        {quickLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a key={link.title} href="#" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white group-hover:border-primary-400">
                <Icon className="h-5 w-5 text-primary-700" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{link.title}</div>
                <div className="text-xs text-gray-400">{link.desc}</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function TrustedBy() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
      <h2 className="mb-6 text-center text-sm font-bold tracking-wider text-gray-400">
        TRUSTED BY THOUSANDS
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {trustedBy.map((brand) => (
          <span
            key={brand.name}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400"
          >
            <Image
              src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-md object-contain"
            />
            {brand.name}
          </span>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="mx-auto mb-4 mt-16 max-w-7xl px-4 md:px-6">
      <div className="grid items-center overflow-hidden rounded-2xl bg-primary-50 md:grid-cols-2">
        <div className="p-8 md:p-10">
          <h3 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl">
            Need Help Finding the Right Property?
          </h3>
          <p className="mb-4 text-gray-500">
            Our property experts are here to help you.
          </p>
          <p className="mb-4 flex items-center gap-2 font-semibold text-primary-800">
            <Phone className="h-4 w-4" /> +92 307 111 6563
          </p>
          <a
            href="#"
            className="inline-block rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800"
          >
            Contact Us
          </a>
        </div>
        <div className="relative h-48 md:h-64">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80"
            alt="Interior"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
