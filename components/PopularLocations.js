import { ArrowRight, Landmark } from "lucide-react";
import { popularLocations } from "@/lib/data";

export default function PopularLocations() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          Popular Locations
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
        >
          View All Locations <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {popularLocations.map((loc) => (
          <a
            key={loc.name}
            href="#"
            className="rounded-xl border border-gray-100 p-4 text-center transition hover:border-primary-200 hover:shadow-md"
          >
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
              <Landmark className="h-5 w-5 text-primary-700" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{loc.name}</div>
            <div className="text-xs text-gray-400">{loc.count}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
