import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Chip, Initials } from "./ui";

const offerings = [
  { tag: "Tradition", title: "Traditional Sun-Curing", text: "Hill-grown produce, sun-dried and slow-cured in cold-pressed mustard oil.", image: "/optimise/a10.jpg", href: "/about-us" },
  { tag: "Quality", title: "Small-Batch Making", text: "Made by hand in small batches and checked before every jar is sealed.", image: "/optimise/a12.jpg", href: "/about-us" },
  { tag: "Bulk", title: "Café & Bulk Orders", text: "Plan a bulk order for your café, dhaba or event in the flavours you need.", image: "/optimise/a17.jpg", href: "/contact-us" },
  { tag: "Gifting", title: "Festive Gift Hampers", text: "Share the taste of the hills with family and friends on every occasion.", image: "/optimise/a6.jpg", href: "/contact-us" },
  { tag: "Delivery", title: "Pan-India Delivery", text: "Freshly packed jars delivered to 60+ cities across India.", image: "/optimise/a14.jpg", href: "/products" },
];

export default function Offerings() {
  const track = useRef(null);
  const [email, setEmail] = useState("");
  const scroll = (dir) => track.current?.scrollBy({ left: dir * (track.current.clientWidth * 0.8), behavior: "smooth" });

  const subscribe = (e) => {
    e.preventDefault();
    window.location.href = `mailto:thehimachaliway@gmail.com?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent(`Please add ${email} to The Himachali Way updates.`)}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="flex items-center justify-between gap-4">
        <Chip>What we offer</Chip>
        <div className="flex gap-2">
          {[[-1, ArrowLeft, "Previous"], [1, ArrowRight, "Next"]].map(([d, Icon, label]) => (
            <button
              key={label}
              onClick={() => scroll(d)}
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-ae hover:bg-ae hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.9fr_1fr]">
        <ul ref={track} className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {offerings.map((o) => (
            <li key={o.title} className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)]">
              <a href={o.href} className="group block">
                <div className="relative h-56 overflow-hidden rounded-3xl sm:h-64">
                  <img src={o.image} alt={o.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800">{o.tag}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-neutral-900">{o.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{o.text}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 group-hover:text-ae">
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-[34px]">
              Real Taste. Real Ingredients. Real Himachal.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              Discover how we turn hill-grown produce into honest, handmade achar that tastes like home.
            </p>
            <a href="/products" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-ae">
              View all products <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-3xl bg-ae-lime p-6">
            <h3 className="text-xl font-semibold text-ae-dark">Stay Inspired. Stay Informed.</h3>
            <p className="mt-2 text-sm leading-relaxed text-ae-dark/80">
              Get recipes, new launches and seasonal batches straight to your inbox.
            </p>
            <form onSubmit={subscribe} className="mt-4 flex gap-2 rounded-full bg-white p-1.5 pl-4">
              <label htmlFor="offer-email" className="sr-only">Email address</label>
              <input
                id="offer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
              <button type="submit" className="rounded-full bg-ae px-4 py-2 text-sm font-semibold text-white hover:bg-ae-dark">
                Subscribe
              </button>
            </form>
            <div className="mt-4 flex items-center gap-3">
              <Initials names={["PS", "RV", "SR"]} size="h-7 w-7" />
              <span className="text-xs font-medium text-ae-dark/80">Join our pickle-loving community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
