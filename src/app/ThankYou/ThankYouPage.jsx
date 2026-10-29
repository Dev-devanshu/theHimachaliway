import { ArrowRight, Check, Clock, MessageCircle, PhoneCall, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PHONE } from "../../data/contact";
import { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import ProductCard from "../../components/ProductCard";
import { allProducts } from "../../data/products";
import { usePageMeta } from "../../lib/usePageMeta";

const steps = [
  { icon: Check, title: "Message received", text: "Your query is saved with us." },
  { icon: Clock, title: "We review it", text: "Our team reads every message personally." },
  { icon: PhoneCall, title: "We get back to you", text: "Usually within one business day." },
];

export default function ThankYouPage() {
  const { state } = useLocation();
  const name = state?.name?.split(" ")[0];
  const waUrl = `https://wa.me/${PHONE.replace(/\D/g, "")}${state?.waText ? `?text=${encodeURIComponent(state.waText)}` : ""}`;

  usePageMeta("Thank you | The Himachali Way", "Thanks for contacting The Himachali Way.", "/thank-you");

  useEffect(() => {
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex";
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        <section className="px-3 pt-3 sm:px-5">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-ae-bg px-6 py-14 text-center sm:px-10 sm:py-20">
            <span aria-hidden="true" className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-ae-lime/40 blur-3xl" />
            <span aria-hidden="true" className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-ae/10 blur-3xl" />

            <div className="relative">
              <span className="relative mx-auto grid h-24 w-24 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-ae/20 [animation-iteration-count:2]" />
                <span className="relative grid h-24 w-24 place-items-center rounded-full bg-ae text-white shadow-xl ring-8 ring-white">
                  <Check className="h-11 w-11" strokeWidth={3} />
                </span>
              </span>

              <h1 className="mt-8 text-4xl font-medium tracking-tight sm:text-5xl">
                Thank you{name ? `, ${name}` : ""}!
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
                Your message has reached us. We usually reply within one business day on your phone or email.
              </p>
              {state?.id && (
                <p className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ae-dark shadow-sm">
                  Query ID: #{state.id}
                </p>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ae px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ae-dark">
                  <MessageCircle className="h-4 w-4" /> {state?.waText ? "Also send on WhatsApp" : "Chat on WhatsApp"}
                </a>
                <a href="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:shadow-md">
                  <ShoppingBag className="h-4 w-4" /> Continue shopping
                </a>
              </div>
              <p className="mt-3 text-sm text-neutral-500">Need a faster reply? Send the same message on WhatsApp.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <h2 className="text-center text-2xl font-medium sm:text-3xl">What happens next</h2>
          <ol className="relative mt-10 grid gap-6 sm:grid-cols-3">
            <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-6 hidden border-t-2 border-dashed border-ae/25 sm:block" />
            {steps.map(({ icon: Icon, title, text }, k) => (
              <li key={title} className="relative text-center">
                <span className={`relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full ring-8 ring-white ${k === 0 ? "bg-ae text-white" : "bg-ae-soft text-ae"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-base text-neutral-500">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-medium sm:text-3xl">
              While you wait, <span className="text-ae">explore our pickles</span>
            </h2>
            <a href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-ae-dark hover:text-ae">
              View all <ArrowRight className="h-4 w-4" />
            </a>
          </div>
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
