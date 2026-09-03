"use client";

import { KeyRound, Phone, Mail, MapPin } from "lucide-react";

const quickLinks = ["Buy", "Rent", "Projects", "Commercial", "Plots", "Contact Us"];
const resources = ["Areas Guide", "Property Trends", "Blogs", "FAQs", "Privacy Policy", "Terms & Conditions"];

// Simple inline social icons (lucide-react no longer ships brand/logo icons)
const socialIcons = {
  Facebook: (
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
  ),
  Twitter: (
    <path d="M22 5.9c-.7.3-1.5.6-2.4.7a4.1 4.1 0 0 0 1.8-2.3c-.8.5-1.7.8-2.7 1a4.2 4.2 0 0 0-7.2 3.9A12 12 0 0 1 2.9 4.6a4.2 4.2 0 0 0 1.3 5.7c-.7 0-1.3-.2-1.9-.5v.1c0 2.1 1.4 3.8 3.4 4.2-.6.2-1.2.2-1.8.1a4.2 4.2 0 0 0 3.9 3 8.4 8.4 0 0 1-6.2 1.7A11.9 11.9 0 0 0 8.1 21c7.7 0 12-6.6 12-12.3v-.6c.8-.6 1.5-1.3 2-2.2Z" />
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" />
    </>
  ),
  Linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="7" cy="8.5" r="1.5" fill="white" />
      <path d="M5.5 11h3v8h-3zM10.5 11h3v1.3c.6-.9 1.5-1.5 2.8-1.5 2 0 3.2 1.3 3.2 3.9V19h-3v-4.6c0-1.1-.4-1.8-1.3-1.8-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V19h-3z" fill="white" />
    </>
  ),
  Youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5Z" fill="white" />
    </>
  ),
};

function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      {socialIcons[name]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white pb-6 pt-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-800">
                <KeyRound className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Naya Zameen</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Naya Zameen is the most trusted real estate platform in
              Pakistan. We help you buy, sell, rent and invest in the best
              properties across the country.
            </p>
          </div>

          <FooterColumn title="Quick Links" items={quickLinks} />
          <FooterColumn title="Resources" items={resources} />

          <div>
            <h4 className="mb-3 font-semibold text-gray-900">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +92 307 111 6563
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> info@nayazameen.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" /> Office # 1, 2nd Floor,
                Plaza No. 45, Main Boulevard, DHA Phase 6, Lahore.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-gray-900">Newsletter</h4>
            <p className="mb-3 text-sm text-gray-500">
              Subscribe to get the latest property updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-4 flex items-center gap-3 text-gray-500">
              <a href="#" aria-label="Facebook" className="hover:text-primary-700"><SocialIcon name="Facebook" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-primary-700"><SocialIcon name="Twitter" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary-700"><SocialIcon name="Instagram" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary-700"><SocialIcon name="Linkedin" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-primary-700"><SocialIcon name="Youtube" /></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Naya Zameen. All Rights Reserved.</span>
          <span>Made with ❤️ in Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="mb-3 font-semibold text-gray-900">{title}</h4>
      <ul className="space-y-2 text-sm text-gray-500">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="hover:text-primary-700">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
