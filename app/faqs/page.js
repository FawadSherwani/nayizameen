"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  ["How do I post a property listing?", "Create an account, open My Profile, select Post Listing, complete the required property details, and submit the form. Your listing will appear in your account after submission."],
  ["Can I edit or remove my listing?", "Yes. Open My Profile and choose Property Management. You can update or remove listings that belong to your account."],
  ["How can I contact a property owner?", "Open a property detail page and use the enquiry or chat option. Please keep all conversations relevant to the property."],
  ["Are all listings verified?", "We encourage accurate listings and review reports from users. Always inspect a property and verify documentation before making a payment or commitment."],
  ["Is creating an account free?", "Yes. You can create an individual account and post a listing through the portal."],
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);
  return <><Navbar /><main className="min-h-screen bg-slate-50"><section className="bg-primary-800 py-14 text-white"><div className="mx-auto max-w-4xl px-4 md:px-6"><p className="text-sm font-semibold tracking-wider text-primary-100">HELP CENTRE</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1><p className="mt-3 text-primary-100">Answers to common questions about using Nayizameen.</p></div></section><section className="mx-auto max-w-4xl px-4 py-12 md:px-6"><div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">{faqs.map(([question, answer], index) => <article key={question} className="border-b border-slate-100 last:border-0"><button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-slate-800 hover:bg-primary-50 md:px-7"><span>{question}</span><ChevronDown className={'h-5 w-5 shrink-0 text-primary-700 transition ' + (openIndex === index ? 'rotate-180' : '')} /></button>{openIndex === index && <p className="px-5 pb-5 leading-7 text-slate-600 md:px-7">{answer}</p>}</article>)}</div></section></main><Footer /></>;
}