import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Nayizameen",
  description: "Get in touch with the Nayizameen team for property enquiries, support, or partnerships.",
};

const contactPoints = [
  { label: "General enquiries", value: "hello@nayizameen.test" },
  { label: "Phone", value: "+92 300 0000000" },
  { label: "Office", value: "Lahore, Pakistan" },
];

const supportHighlights = [
  "Response within 1 business day",
  "Help with listings, support, and partnerships",
  "Friendly, direct communication with the right team",
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-primary-50/70 via-white to-accent-50/40">
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-primary-700">CONTACT US</p>
              <h1 className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Let&apos;s connect and move your request forward.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Whether you need help with a listing, want to explore a partnership,
                or simply have a question, our team is ready to help in a clear and
                professional way.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {contactPoints.map((item) => (
                  <div key={item.label} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    <p className="mt-2 break-words text-sm font-medium text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-primary-100 bg-primary-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-800">What to expect</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {supportHighlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div>
                <p className="text-sm font-semibold tracking-[0.25em] text-primary-700">SEND A MESSAGE</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Tell us a little about your request</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Share the details below and we&apos;ll route your message to the right
                  person.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:ring-4 focus:ring-primary-50"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:ring-4 focus:ring-primary-50"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Subject</span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:ring-4 focus:ring-primary-50"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Message</span>
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Please include any relevant details about your enquiry."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:ring-4 focus:ring-primary-50"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary-700 px-6 text-sm font-semibold text-white transition hover:bg-primary-800"
              >
                Send message
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                By submitting this form, you agree to be contacted about your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
