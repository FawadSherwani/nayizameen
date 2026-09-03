import Image from "next/image";
import { ArrowRight, MapPin, Heart } from "lucide-react";
import { featuredProjects } from "@/lib/data";

export default function FeaturedProjects() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          Featured Projects
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
        >
          View All Projects <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProjects.map((project) => (
          <div
            key={project.title}
            className="overflow-hidden rounded-xl border border-gray-100 shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-40">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded bg-primary-800/90 px-2 py-1 text-[10px] font-bold text-white">
                {project.badge}
              </span>
              <button
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
                aria-label="Save"
              >
                <Heart className="h-3.5 w-3.5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-semibold text-gray-900">{project.title}</h3>
              <p className="mb-2 flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" /> {project.location}
              </p>
              <p className="mb-3 text-sm font-bold text-primary-700">{project.price}</p>
              <a
                href="#"
                className="block rounded-lg bg-primary-700 py-2 text-center text-xs font-semibold text-white hover:bg-primary-800"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
