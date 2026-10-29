import { ArrowRight } from "lucide-react";
import { blogPosts } from "../data/blog";
import { Chip } from "./ui";

const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Blog() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Chip>From our kitchen</Chip>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl lg:text-[44px]">
            Recipes & <span className="text-ae">Pickle</span> Stories
          </h2>
        </div>
        <a href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-ae-dark hover:text-ae">
          View all blogs <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {blogPosts.slice(0, 3).map((p) => (
          <li key={p.id}>
            <a href={`/blogs#post-${p.id}`} className="group flex h-full flex-col">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800">{p.category}</span>
              </div>
              <p className="mt-4 text-sm text-neutral-500">{fmt(p.date)}</p>
              <h3 className="mt-1 text-lg font-semibold leading-snug text-neutral-900">{p.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-base text-neutral-500">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 group-hover:text-ae">
                Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
