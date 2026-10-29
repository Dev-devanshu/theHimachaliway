import { useState } from "react";
import Blog from "../../components/Blog";
import CtaBanner from "../../components/CtaBanner";
import Faq from "../../components/Faq";
import Hero, { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import Mission from "../../components/Mission";
import Offerings from "../../components/Offerings";
import { allProducts } from "../../data/products";
import Process from "../../components/Process";
import Products from "../../components/Products";
import PromiseStrip from "../../components/Promise";
import Testimonials from "../../components/Testimonials";


export default function HomePage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const products = q ? allProducts.filter((p) => p.name.toLowerCase().includes(q)) : allProducts;

  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        <Hero query={query} setQuery={setQuery} />
        <Mission />
        <PromiseStrip />
        <Products products={products} total={allProducts.length} onReset={() => setQuery("")} />
        <Process />
        <Offerings />
        <Testimonials />
        <Faq />
        <Blog />
        <CtaBanner />
      </main>
      <HomeFooter />
    </div>
  );
}
