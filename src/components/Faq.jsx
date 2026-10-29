import { MessageCircle, Minus, Phone, Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/faqs";
import { Chip } from "./ui";

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Chip>FAQ</Chip>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-[44px]">
            Frequently Asked <span className="text-ae">Questions</span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-neutral-600">
            Everything you need to know about our achar: ingredients, freshness, storage and delivery.
          </p>

          <div className="mt-8 rounded-3xl bg-ae-bg p-6">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ae">
              <MessageCircle className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">Still have a question?</h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              Our team is happy to help with orders, bulk enquiries or anything else.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="tel:+918091736987" className="inline-flex items-center gap-2 rounded-full bg-ae px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ae-dark">
                <Phone className="h-4 w-4" /> Call us
              </a>
              <a href="/contact-us" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:shadow-md">
                Contact page
              </a>
            </div>
          </div>
        </div>

        <ul className="space-y-3">
          {faqs.map((f, k) => {
            const isOpen = open === k;
            return (
              <li key={f.q} className={`rounded-2xl border transition ${isOpen ? "border-ae/30 bg-ae-soft" : "border-neutral-200 bg-white hover:border-ae/30"}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : k)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-base font-semibold text-neutral-900 sm:text-lg">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isOpen ? "bg-ae text-white" : "bg-ae-soft text-ae-dark"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden px-5 text-base leading-relaxed text-neutral-600 sm:px-6">
                    <span className="block pb-5">{f.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
