"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const locationSets = {
  sale: {
    plots: {
      Lahore: ["DHA Defence", "Raiwind Road", "Park View City", "Bahria Town", "LDA Road", "Bahria Orchard", "LDA Avenue", "Central Park Housing"],
      Karachi: ["Scheme 33", "DHA Defence", "Gadap Town", "Bahria Town Karachi", "DHA City Karachi", "Naya Nazimabad", "Cantt", "Malir"],
      Islamabad: ["DHA Defence", "Gulberg", "Bahria Town", "B-17", "Top City 1", "Faisal Hills", "Faisal Town - F-18", "D-12"],
    },
    flats: {
      Lahore: ["Askari", "Gulberg", "Bahria Town", "Raiwind Road"],
      Karachi: ["DHA Defence", "Gulistan-e-Jauhar", "Scheme 33"],
      Islamabad: ["DHA Defence", "Gulberg", "B-17"],
    },
  },
  rent: {
    plots: {
      Lahore: ["DHA Defence", "Raiwind Road", "Bahria Town", "Park View City"],
      Karachi: ["DHA Defence", "Scheme 33", "Bahria Town Karachi", "Gulshan-e-Iqbal Town"],
      Islamabad: ["DHA Defence", "Bahria Town", "Gulberg", "B-17"],
    },
    flats: {
      Lahore: ["Gulberg", "DHA Defence", "Bahria Town", "Johar Town"],
      Karachi: ["DHA Defence", "Gulistan-e-Jauhar", "Clifton", "PECHS"],
      Islamabad: ["DHA Defence", "Gulberg", "Bahria Town", "F-11"],
    },
  },
};

function LocationGroup({ title, places, propertyType, purpose }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-bold text-gray-900">{title}</h4>
      <ul className="space-y-2.5">
        {places.map((place) => (
          <li key={place}>
            <a href="#" className="group flex items-center gap-2 text-sm text-gray-600 hover:text-primary-700">
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-emerald-500 group-hover:text-primary-700" />
              {propertyType} for {purpose} in {place}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LocationCategory({ title, locations, propertyType, purpose }) {
  return (
    <div className="mt-10">
      <h3 className="mb-6 text-xl font-bold text-gray-900 md:text-2xl">{title}</h3>
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {Object.entries(locations).map(([city, places]) => (
          <LocationGroup key={city} title={city} places={places} propertyType={propertyType} purpose={purpose} />
        ))}
      </div>
    </div>
  );
}

export default function PopularLocations() {
  const [purpose, setPurpose] = useState("sale");
  const content = locationSets[purpose];
  const purposeLabel = purpose === "sale" ? "sale" : "rent";

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 pb-4 md:px-6">
      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Popular Locations</h2>
      <div className="mt-5 flex items-center gap-3 border-b border-gray-200 pb-4">
        {["sale", "rent"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setPurpose(tab)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${purpose === tab ? "border-2 border-gray-900 text-gray-900" : "border-2 border-transparent text-gray-500 hover:text-gray-900"}`}
          >
            For {tab === "sale" ? "Sale" : "Rent"}
          </button>
        ))}
      </div>
      <LocationCategory title="Most Popular Locations for Plots" locations={content.plots} propertyType="Plots" purpose={purposeLabel} />
      <LocationCategory title="Most Popular Locations for Flats" locations={content.flats} propertyType="Flats" purpose={purposeLabel} />
    </section>
  );
}