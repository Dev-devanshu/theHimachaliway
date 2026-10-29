import { Quote, Star } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { Chip } from "./ui";

const picks = [testimonials[0], testimonials[3], testimonials[4]];

export default function Testimonials() {
  return (
    <section className="px-3 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-ae-bg px-5 py-14 sm:px-10 lg:py-16">
        <div className="text-center">
          <Chip>Reviews</Chip>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl lg:text-[44px]">
            What Our <span className="text-ae">Customers</span> Say
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {picks.map((t) => (
            <li key={t.name} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {[0, 1, 2, 3, 4].map((k) => (
                    <Star key={k} className={`h-4 w-4 ${k < t.rating ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200"}`} />
                  ))}
                </span>
                <Quote className="h-6 w-6 text-ae/25" />
              </div>
              <p className="mt-5 flex-1 text-base leading-relaxed text-neutral-700">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ae text-sm font-bold text-white">
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-neutral-900">{t.name}</span>
                  <span className="block text-sm text-neutral-500">{t.role}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
