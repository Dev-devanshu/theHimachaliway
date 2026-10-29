import { ChevronRight, Mail, Phone } from "lucide-react";
import { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import { Chip } from "../../components/ui";
import { legalPages } from "./legalContent";

const slugId = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function LegalPage({ page }) {
  const { title, intro, sections } = legalPages[page];

  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        <section className="px-3 pt-3 sm:px-5">
          <div className="mx-auto max-w-7xl rounded-[28px] bg-ae-bg px-6 py-12 sm:px-10 sm:py-14">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-neutral-500">
              <a href="/" className="hover:text-ae">Home</a>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-neutral-800">{title}</span>
            </nav>
            <div className="mt-6"><Chip>Legal</Chip></div>
            <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-3 text-base text-neutral-500">Last updated: 29 October 2026</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">On this page</p>
            <ul className="mt-4 space-y-1 border-l border-neutral-200">
              {sections.map((s) => (
                <li key={s.h}>
                  <a href={`#${slugId(s.h)}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-neutral-600 hover:border-ae hover:text-ae">
                    {s.h}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-3xl bg-ae-bg p-5">
              <p className="text-sm font-semibold">Questions?</p>
              <a href="mailto:thehimachaliway@gmail.com" className="mt-3 flex items-center gap-2 break-all text-sm text-neutral-700 hover:text-ae">
                <Mail className="h-4 w-4 shrink-0 text-ae" /> thehimachaliway@gmail.com
              </a>
              <a href="tel:+918091736987" className="mt-2 flex items-center gap-2 text-sm text-neutral-700 hover:text-ae">
                <Phone className="h-4 w-4 text-ae" /> +91 80917 36987
              </a>
            </div>
          </aside>

          <article className="max-w-3xl">
            <p className="text-lg leading-relaxed text-neutral-700">{intro}</p>
            {sections.map((s) => (
              <section key={s.h} id={slugId(s.h)} className="scroll-mt-28 border-t border-neutral-100 pt-8 mt-8">
                <h2 className="text-2xl font-semibold">{s.h}</h2>
                {s.p?.map((t) => (
                  <p key={t} className="mt-3 text-base leading-relaxed text-neutral-600">{t}</p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2">
                    {s.list.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-base leading-relaxed text-neutral-600">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ae" /> {t}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
