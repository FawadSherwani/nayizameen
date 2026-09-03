import Image from "next/image";
import { ArrowRight, MapPin, Heart, Ruler, Bed, Bath } from "lucide-react";
import { featuredProperties } from "@/lib/data";

export default function FeaturedProperties() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          Featured Properties
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
        >
          View All Properties <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProperties.map((prop) => (
          <div
            key={prop.title}
            className="overflow-hidden rounded-xl border border-gray-100 shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-40">
              <Image
                src={prop.image}
                alt={prop.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-3 top-3 flex gap-1">
                {prop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-primary-800/90 px-2 py-1 text-[10px] font-bold text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
                aria-label="Save"
              >
                <Heart className="h-3.5 w-3.5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-semibold text-gray-900">{prop.title}</h3>
              <p className="mb-2 flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" /> {prop.location}
              </p>
              <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
                {prop.area && (
                  <span className="flex items-center gap-1">
                    <Ruler className="h-3 w-3" /> {prop.area}
                  </span>
                )}
                {prop.beds && (
                  <span className="flex items-center gap-1">
                    <Bed className="h-3 w-3" /> {prop.beds} Beds
                  </span>
                )}
                {prop.baths && (
                  <span className="flex items-center gap-1">
                    <Bath className="h-3 w-3" /> {prop.baths} Baths
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-primary-700">{prop.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
