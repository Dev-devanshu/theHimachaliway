import { Download, Phone, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import CtaBanner from "../../components/CtaBanner";
import Faq from "../../components/Faq";
import { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import PageHero from "../../components/PageHero";
import Process from "../../components/Process";
import ProductCard from "../../components/ProductCard";
import { allProducts } from "../../data/products";
import PromiseStrip from "../../components/Promise";
import Testimonials from "../../components/Testimonials";

const reviewCount = (p) => parseInt(p.reviews, 10) || 0;

const sorts = {
  popular: { label: "Most popular", fn: (a, b) => reviewCount(b) - reviewCount(a) },
  rating: { label: "Top rated", fn: (a, b) => b.rating - a.rating },
  low: { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  high: { label: "Price: high to low", fn: (a, b) => b.price - a.price },
};

export const ProductsPage = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");

  const q = query.trim().toLowerCase();
  const products = allProducts
    .filter((p) => !q || p.name.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q))
    .sort(sorts[sort].fn);

  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        <PageHero
          crumb="Products"
          chip="Our pickles"
          title={<>Shop Handmade <span className="text-ae">Himachali</span> Achar</>}
          text={`${allProducts.length} traditional pickles, sun-cured in cold-pressed mustard oil and packed fresh in small batches.`}
          image="/optimise/a19.jpg"
        >
          <a href="/pdf/pdf.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ae px-5 py-3 text-sm font-semibold text-white transition hover:bg-ae-dark">
            <Download className="h-4 w-4" /> Download catalog
          </a>
          <a href="tel:+918091736987" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition hover:shadow-md">
            <Phone className="h-4 w-4" /> Call to order
          </a>
        </PageHero>

        <PromiseStrip />

        <section id="products" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-20">
          <div className="sticky top-[84px] z-20 -mx-5 flex flex-col gap-3 border-b border-neutral-100 bg-white/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-base text-neutral-600">
              Showing <span className="font-semibold text-neutral-900">{products.length}</span> of {allProducts.length} pickles
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 sm:w-72">
                <Search className="h-4 w-4 shrink-0 text-neutral-400" />
                <span className="sr-only">Search pickles</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pickles…"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
              </label>
              <label className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5">
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-neutral-400" />
                <span className="sr-only">Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="cursor-pointer bg-transparent text-sm font-medium text-neutral-800 outline-none">
                  {Object.entries(sorts).map(([k, s]) => (
                    <option key={k} value={k}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="mt-8 rounded-3xl bg-ae-bg px-6 py-14 text-center">
              <p className="text-base text-neutral-600">No pickle matches "{query}".</p>
              <button onClick={() => setQuery("")} className="mt-4 rounded-full bg-ae px-5 py-2.5 text-sm font-semibold text-white hover:bg-ae-dark">
                Show all pickles
              </button>
            </div>
          ) : (
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <li key={p.slug}>
                  <ProductCard p={p} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <Process />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>
      <HomeFooter />
    </div>
  );
};

export default ProductsPage;
