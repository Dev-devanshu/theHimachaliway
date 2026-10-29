import { ArrowLeft, Search } from "lucide-react";
import { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import ProductCard from "../../components/ProductCard";
import { allProducts } from "../../data/products";
import { usePageMeta } from "../../lib/usePageMeta";

export default function NotFoundPage() {
  usePageMeta("Page not found | The Himachali Way", "This page could not be found.", "/404");

  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
          <p className="text-7xl font-semibold text-ae sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">This jar seems to be empty</h1>
          <p className="mt-3 text-base text-neutral-600 sm:text-lg">The page you're looking for doesn't exist or may have moved.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/" className="inline-flex items-center gap-2 rounded-full bg-ae px-6 py-3 text-sm font-semibold text-white hover:bg-ae-dark">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </a>
            <a href="/products" className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-ae hover:text-ae">
              <Search className="h-4 w-4" /> Browse pickles
            </a>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <h2 className="text-center text-2xl font-medium">Popular right now</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {allProducts.slice(0, 4).map((p) => (
              <li key={p.slug}><ProductCard p={p} /></li>
            ))}
          </ul>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
