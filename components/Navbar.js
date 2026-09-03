"use client";

import Link from "next/link";
import { useState } from "react";
import { KeyRound, ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Buy", href: "#" },
  { label: "Rent", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Commercial", href: "#" },
  { label: "Areas Guide", href: "#" },
  { label: "Plots", href: "#" },
];

const resourceLinks = ["Property Trends", "Blogs", "FAQs"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-800">
            <KeyRound className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Naya Zameen</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-gray-700 lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-primary-700">
              {link.label}
            </a>
          ))}
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-primary-700">
              Resources <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full hidden w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg group-hover:block">
              {resourceLinks.map((item) => (
                <a key={item} href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-primary-700 sm:block">
            Login
          </a>
          <a
            href="#"
            className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800"
          >
            Add Property
          </a>
          <button className="lg:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 lg:hidden">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="rounded-lg px-2 py-2 hover:bg-gray-50">
              {link.label}
            </a>
          ))}
          {resourceLinks.map((item) => (
            <a key={item} href="#" className="rounded-lg px-2 py-2 hover:bg-gray-50">
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
