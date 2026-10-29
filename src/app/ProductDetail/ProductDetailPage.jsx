import { Check, ChevronRight, Minus, Phone, Plus, ShieldCheck, Star, Sun, Truck } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CtaBanner from "../../components/CtaBanner";
import { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import ProductCard from "../../components/ProductCard";
import { allProducts } from "../../data/products";
import { Chip } from "../../components/ui";
import { usePageMeta } from "../../lib/usePageMeta";

const WHATSAPP = "918091736987";

const trust = [
  { icon: Truck, text: "Pan-India delivery" },
  { icon: Sun, text: "Sun-cured, small batch" },
  { icon: ShieldCheck, text: "No artificial colours" },
];

function Gallery({ p }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[28px] bg-ae-bg">
        <img src={p.images[active]} alt={p.name} className="h-full w-full object-contain p-6 mix-blend-multiply" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-red-500 shadow-sm">-{p.discount}%</span>
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-3">
        {p.images.map((src, k) => (
          <li key={src}>
            <button
              onClick={() => setActive(k)}
              aria-label={`Show image ${k + 1}`}
              className={`aspect-square w-full overflow-hidden rounded-2xl border-2 bg-ae-bg transition ${k === active ? "border-ae" : "border-transparent hover:border-ae/40"}`}
            >
              <img src={src} alt="" className="h-full w-full object-contain p-1.5 mix-blend-multiply" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Detail({ p }) {
  const [size, setSize] = useState(p.sizes[0]);
  const [qty, setQty] = useState(1);
  const message = `Hi! I'd like to order ${qty} x ${p.name} (${size}) from The Himachali Way.`;

  return (
    <div className="lg:py-2">
      <Chip>{p.tag}</Chip>
      <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl lg:text-[44px]">{p.name}</h1>
      <div className="mt-3 flex items-center gap-2">
        <span className="flex gap-0.5" aria-label={`${p.rating} out of 5 stars`}>
          {[0, 1, 2, 3, 4].map((k) => (
            <Star key={k} className={`h-4 w-4 ${k < Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200"}`} />
          ))}
        </span>
        <span className="text-sm font-semibold text-neutral-800">{p.rating.toFixed(1)}</span>
        <span className="text-sm text-neutral-500">· {p.reviews}</span>
      </div>

      <p className="mt-6 flex items-baseline gap-3">
        <span className="text-4xl font-semibold text-ae-dark">₹{p.price}</span>
        <span className="text-lg text-neutral-400 line-through">₹{p.mrp}</span>
        <span className="rounded-full bg-red-50 px-2.5 py-1 text-sm font-semibold text-red-500">Save {p.discount}%</span>
      </p>

      <div className="mt-8">
        <p className="text-sm font-semibold text-neutral-900">Pack size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${size === s ? "border-ae bg-ae text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-ae"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-neutral-900">Quantity</p>
        <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-neutral-200 p-1">
          <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ae-soft">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-base font-semibold" aria-live="polite">{qty}</span>
          <button onClick={() => setQty(Math.min(20, qty + 1))} aria-label="Increase quantity" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ae-soft">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ae px-6 py-4 text-base font-semibold text-white transition hover:bg-ae-dark"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zM12 .2C5.5.2.2 5.5.2 12c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.6c1.7.9 3.7 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8S18.5.2 12 .2z" />
          </svg>
          Order on WhatsApp
        </a>
        <a href="tel:+918091736987" className="flex items-center justify-center gap-2 rounded-full border border-neutral-300 px-6 py-4 text-base font-semibold text-neutral-800 transition hover:border-ae hover:text-ae">
          <Phone className="h-5 w-5" /> Call to order
        </a>
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-2">
        {trust.map(({ icon: Icon, text }) => (
          <li key={text} className="flex flex-col items-center gap-2 rounded-2xl bg-ae-bg px-2 py-4 text-center text-xs font-medium text-neutral-700 sm:text-sm">
            <Icon className="h-5 w-5 text-ae" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Info({ p }) {
  const rows = [
    ["Packing", p.packing.type],
    ["Shelf life", p.packing.shelfLife],
    ["Storage", p.packing.storage],
    ["Oil", p.packing.oil],
    ["Origin", p.packing.origin],
  ];
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-neutral-200 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Why you'll love it</h2>
        <ul className="mt-5 space-y-4">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-base text-neutral-700">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ae-soft text-ae">
                <Check className="h-3.5 w-3.5" />
              </span>
              {h}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-neutral-200 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Packing details</h2>
        <dl className="mt-5 divide-y divide-neutral-100">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-3 text-base">
              <dt className="text-neutral-500">{k}</dt>
              <dd className="text-right font-medium text-neutral-800">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const p = allProducts.find((x) => x.slug === slug);
  const related = allProducts.filter((x) => x.slug !== slug).slice(0, 4);

  usePageMeta(
    p ? `${p.name} | The Himachali Way` : "Product not found | The Himachali Way",
    p ? `${p.name}: handmade Himachali pickle, sun-cured in cold-pressed mustard oil. Order online from The Himachali Way.` : "This pickle could not be found.",
    `/product/${slug}`,
  );

  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        {p ? (
          <>
            <section className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500">
                <a href="/" className="hover:text-ae">Home</a>
                <ChevronRight className="h-3.5 w-3.5" />
                <a href="/products" className="hover:text-ae">Products</a>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-medium text-neutral-800">{p.name}</span>
              </nav>
              <div key={p.slug} className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
                <Gallery p={p} />
                <Detail p={p} />
              </div>
            </section>

            <Info p={p} />

            <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                  You may also <span className="text-ae">like</span>
                </h2>
                <a href="/products" className="text-sm font-semibold text-ae-dark hover:text-ae">View all products →</a>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <ProductCard p={r} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <section className="mx-auto max-w-xl px-5 py-24 text-center">
            <h1 className="text-3xl font-medium">Pickle not found</h1>
            <p className="mt-3 text-base text-neutral-600">This product link may be old or mistyped.</p>
            <a href="/products" className="mt-6 inline-block rounded-full bg-ae px-6 py-3 text-sm font-semibold text-white hover:bg-ae-dark">
              Browse all pickles
            </a>
          </section>
        )}
        <CtaBanner />
      </main>
      <HomeFooter />
    </div>
  );
}
