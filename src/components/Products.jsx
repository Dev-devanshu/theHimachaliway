import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Chip } from "./ui";

export default function Products({ products, total, onReset }) {
  return (
    <section id="products" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Chip>Our pickles</Chip>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl lg:text-[44px]">
            Handmade <span className="text-ae">Achar</span> Collection
          </h2>
          <p className="mt-2 text-base text-neutral-500">Showing {products.length} of {total} pickles</p>
        </div>
        <a href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-ae-dark hover:text-ae">
          View all products <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {products.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-ae-bg px-6 py-14 text-center">
          <p className="text-base text-neutral-600">No pickle matches your search.</p>
          <button onClick={onReset} className="mt-4 rounded-full bg-ae px-5 py-2.5 text-sm font-semibold text-white hover:bg-ae-dark">
            Show all pickles
          </button>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard p={p} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
