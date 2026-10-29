import { Star } from "lucide-react";

export default function ProductCard({ p }) {
  return (
    <a href={`/product/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-2 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-ae-bg">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-contain p-3 mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-red-500 shadow-sm">-{p.discount}%</span>
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-3">
        <p className="truncate text-xs text-neutral-500">{p.tag}</p>
        <h3 className="mt-0.5 line-clamp-1 text-base font-semibold text-neutral-900">{p.name}</h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold text-ae-dark">₹{p.price}</span>
            <span className="text-xs text-neutral-400 line-through">₹{p.mrp}</span>
          </p>
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {p.rating}
          </span>
        </div>
        <span className="mt-3 grid place-items-center rounded-full bg-ae-soft py-2.5 text-sm font-semibold text-ae-dark transition group-hover:bg-ae group-hover:text-white">
          Buy Now
        </span>
      </div>
    </a>
  );
}
