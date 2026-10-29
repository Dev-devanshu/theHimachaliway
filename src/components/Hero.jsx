import { Play, Search } from "lucide-react";
import { Chip, Initials } from "./ui";

const stats = [
  { value: "10k+", label: "Happy Customers" },
  { value: "30+", label: "Unique Flavours" },
  { value: "12k+", label: "Orders Delivered" },
  { value: "100%", label: "Natural Ingredients", highlight: true },
];

const floating = [
  { title: "Sun-Cured", text: "Slow cured in mustard oil.", image: "/optimise/a10.jpg" },
  { title: "Farm Sourced", text: "From 20+ Himachali farms.", image: "/optimise/a13.jpg" },
  { title: "No Preservatives", text: "Clean, real ingredients.", image: "/optimise/a5.jpg" },
];

export { default as HomeHeader } from "./Header";

export default function Hero({ query, setQuery }) {
  const submit = (e) => {
    e.preventDefault();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <img src="/test/a.jpg" alt="Snow-capped Himalayan peaks above the clouds" className="h-full w-full object-cover" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white via-white/60 to-transparent" />
        <a
          href="https://www.youtube.com/@TheHimachaliWay"
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute left-[38%] top-[45%] flex items-center gap-3 text-sm font-medium text-white"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-ae-dark shadow-lg transition group-hover:scale-110">
            <Play className="h-5 w-5 fill-current" />
          </span>
          Watch our story
        </a>
        <ul className="absolute right-8 top-1/2 w-60 -translate-y-1/2 space-y-4">
          {floating.map((f, k) => (
            <li key={f.title} className={`flex items-center gap-3 rounded-2xl bg-white/90 p-2.5 pr-4 shadow-xl backdrop-blur ${k === 1 ? "-translate-x-6" : ""}`}>
              <img src={f.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <span>
                <span className="block text-sm font-semibold text-neutral-900">{f.title}</span>
                <span className="block text-xs text-neutral-500">{f.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 lg:min-h-[640px] lg:pb-16 lg:pt-16">
        <div className="max-w-xl">
          <Chip>From the hills of Himachal</Chip>
          <h1 className="mt-6 text-[44px] font-medium leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl lg:text-[68px]">
            Taste the <span className="text-ae">Hills</span>,
            <br /> One Jar at a Time.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg">
            Traditional Pahadi achar from Bilaspur, handmade with hill-grown produce, cold-pressed
            mustard oil and no preservatives.
          </p>

          <form onSubmit={submit} className="mt-8 flex max-w-md items-center gap-2 rounded-full border border-neutral-200 bg-white p-1.5 pl-5 shadow-sm">
            <Search className="h-4 w-4 shrink-0 text-neutral-400" />
            <label htmlFor="hero-search" className="sr-only">Search pickles</label>
            <input
              id="hero-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mango, garlic, nimbu…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
            <button type="submit" className="rounded-full bg-ae px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ae-dark">
              Search
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <Initials names={["AM", "NK", "IK"]} />
            <span className="text-sm text-neutral-600">Loved by 10,000+ happy customers</span>
          </div>
        </div>

        <ul className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className={`rounded-2xl border px-4 py-4 text-center ${s.highlight ? "border-ae-lime bg-ae-lime/40" : "border-neutral-200 bg-white/90"}`}>
              <p className="text-2xl font-semibold text-ae-dark">{s.value}</p>
              <p className="mt-1 text-xs text-neutral-500">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <img src="/test/a.jpg" alt="" className="h-64 w-full object-cover sm:h-80 lg:hidden" />
    </section>
  );
}
