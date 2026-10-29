import { ArrowRight, ClipboardCheck, Leaf, Package, ShieldCheck, Sprout, Sun } from "lucide-react";
import CtaBanner from "../../components/CtaBanner";
import { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import PageHero from "../../components/PageHero";
import Process from "../../components/Process";
import Testimonials from "../../components/Testimonials";
import { Chip } from "../../components/ui";

const stats = [
  { value: "12k+", label: "Orders delivered" },
  { value: "60+", label: "Cities served" },
  { value: "4.8/5", label: "Average rating" },
  { value: "20+", label: "Farmer partners" },
];

const values = [
  { icon: Sprout, title: "Local & Seasonal", text: "We buy at peak season from small Himachali farms." },
  { icon: Sun, title: "Traditional Methods", text: "Sun-curing, clean brines and spice tempering." },
  { icon: ShieldCheck, title: "Clean Labels", text: "No artificial colours or preservatives, ever." },
  { icon: Leaf, title: "Crunch Engineering", text: "Process tweaks that keep vegetables crisp." },
  { icon: Package, title: "Eco Packaging", text: "Glass-first, with refill and recycle drives." },
  { icon: ClipboardCheck, title: "Batch QC", text: "Every lot is tasted, logged and batch-coded." },
];

const milestones = [
  { year: "2019", text: "First 50 jars from a Shimla kitchen." },
  { year: "2021", text: "10+ farm partners; Amla & Chukh launched." },
  { year: "2023", text: "Batch QC & pan-India deliveries." },
  { year: "2025", text: "Eco packaging & expanded seasonal line." },
];

export function AboutUsPage() {
  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        <PageHero
          crumb="About Us"
          chip="Our story"
          title={<>From the <span className="text-ae">Himachal</span> Hills to Your Table</>}
          text="Small-batch Himachali pickles made with sunshine curing, cold-pressed mustard oil and farmer-first sourcing."
          image="/optimise/a16.jpg"
        >
          <a href="/products" className="inline-flex items-center gap-2 rounded-full bg-ae px-5 py-3 text-sm font-semibold text-white transition hover:bg-ae-dark">
            Shop pickles <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/blogs" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition hover:shadow-md">
            Explore recipes
          </a>
        </PageHero>

        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div className="relative h-[420px] sm:h-[500px]">
            <img src="/optimise/a6.jpg" alt="Jar of mixed Himachali pickle" className="absolute left-0 top-0 h-[78%] w-[70%] rounded-[28px] object-cover" />
            <img src="/optimise/a13.jpg" alt="Pickle in a clay bowl beside a ceramic jar" className="absolute bottom-0 right-0 h-[52%] w-[52%] rounded-[28px] object-cover ring-8 ring-white" />
            <div className="absolute bottom-6 left-4 rounded-2xl bg-ae-lime px-5 py-4 shadow-lg">
              <p className="text-3xl font-semibold text-ae-dark">7+</p>
              <p className="text-sm font-medium text-ae-dark/80">years of pickle craft</p>
            </div>
          </div>
          <div>
            <Chip>Who we are</Chip>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
              Keeping <span className="text-ae">Pahadi</span> Food Traditions Alive
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
              The Himachali Way started with a simple idea: the achar made in Himachali homes deserves
              a place on every Indian table. We still make it the way it has always been made, with
              seasonal hill produce, freshly ground spices, cold-pressed mustard oil and plenty of sunshine.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Every jar is prepared in small batches from our base in Bilaspur, Himachal Pradesh, and
              tasted before it is packed. No factories, no shortcuts.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <li key={s.label} className="rounded-2xl border border-neutral-200 p-4 text-center">
                  <p className="text-2xl font-semibold text-ae-dark">{s.value}</p>
                  <p className="mt-1 text-xs text-neutral-500">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-3 sm:px-5">
          <div className="mx-auto max-w-7xl rounded-[28px] bg-ae-bg px-5 py-14 sm:px-10 lg:py-16">
            <div className="text-center">
              <Chip>What we stand for</Chip>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl lg:text-[44px]">
                Our <span className="text-ae">Values</span>
              </h2>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map(({ icon: Icon, title, text }) => (
                <li key={title} className="group rounded-3xl bg-white p-6 transition hover:shadow-xl">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ae-soft text-ae transition group-hover:bg-ae group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-neutral-500">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="text-center">
            <Chip>Our journey</Chip>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl lg:text-[44px]">
              Milestones <span className="text-ae">So Far</span>
            </h2>
          </div>
          <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-5 hidden border-t-2 border-dashed border-ae/25 lg:block" />
            {milestones.map((m) => (
              <li key={m.year} className="relative text-center">
                <span className="relative z-10 inline-block rounded-full bg-ae px-5 py-2 text-base font-semibold text-white ring-8 ring-white">{m.year}</span>
                <p className="mx-auto mt-5 max-w-[240px] text-base leading-relaxed text-neutral-600">{m.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <Process />
        <Testimonials />
        <div className="pt-16 lg:pt-20">
          <CtaBanner />
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}

export default AboutUsPage;
