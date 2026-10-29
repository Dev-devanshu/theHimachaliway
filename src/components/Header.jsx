import { ArrowRight, ArrowUpRight, ChevronDown, Facebook, Instagram, Menu, MessageCircle, Phone, Truck, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { allProducts } from "../data/products";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", mega: true },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

const featured = allProducts.slice(0, 4);

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/thehimachaliway/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1ECwaAVhmQ/" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@TheHimachaliWay" },
];

function Logo() {
  return (
    <a href="/" className="flex shrink-0 items-center gap-2.5">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-ae-soft">
        <img src="/Home/logo.png" alt="The Himachali Way" className="h-9 w-9 object-contain" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-semibold tracking-tight text-neutral-900">Himachali Way</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ae">Taste · Travel · Traditions</span>
      </span>
    </a>
  );
}

function MegaMenu() {
  return (
    <div className="invisible absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div className="grid grid-cols-[1fr_200px] gap-4 rounded-3xl border border-neutral-100 bg-white p-4 shadow-2xl">
        <ul className="grid grid-cols-2 gap-2">
          {featured.map((p) => (
            <li key={p.slug}>
              <a href={`/product/${p.slug}`} className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-ae-bg">
                <img src={p.image} alt="" className="h-14 w-14 rounded-xl bg-ae-bg object-contain p-1 mix-blend-multiply" />
                <span>
                  <span className="block text-sm font-semibold text-neutral-900">{p.name}</span>
                  <span className="block text-xs text-neutral-500">from ₹{p.price}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href="/products" className="relative flex flex-col justify-end overflow-hidden rounded-2xl p-4 text-white">
          <img src="/optimise/a10.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
          <span className="relative text-base font-semibold leading-tight">All {allProducts.length} pickles</span>
          <span className="relative mt-1 inline-flex items-center gap-1 text-xs font-semibold text-ae-lime">
            Shop the range <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/s$/, "")));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="bg-ae-dark text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-6 px-5 text-xs sm:justify-between sm:px-8">
          <p className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-ae-lime" /> Pan-India delivery · Handmade in Bilaspur, Himachal
          </p>
          <a href="tel:+918091736987" className="hidden items-center gap-1.5 font-semibold hover:text-ae-lime sm:flex">
            <Phone className="h-3.5 w-3.5" /> +91 80917 36987
          </a>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "px-3 pt-3 sm:px-5" : "bg-white"}`}>
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? "h-16 rounded-full border border-neutral-200/80 bg-white/90 pl-3 pr-2 shadow-lg backdrop-blur-md sm:pl-4" : "h-20 px-5 sm:px-8"
          }`}
        >
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 rounded-full bg-ae-bg p-1 lg:flex">
            {links.map((l) => (
              <div key={l.href} className="group relative">
                <a
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive(l.href) ? "bg-white text-ae-dark shadow-sm" : "text-neutral-600 hover:text-ae-dark"
                  }`}
                >
                  {l.label}
                  {l.mega && <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />}
                </a>
                {l.mega && <MegaMenu />}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/918091736987"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden h-11 w-11 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-ae hover:text-ae sm:grid"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="/products" className="group hidden items-center gap-2 rounded-full bg-ae py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition hover:bg-ae-dark sm:inline-flex">
              Shop Now
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ae-lime text-ae-dark transition group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full bg-ae text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
        <aside
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-ae-bg text-neutral-800">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold transition ${
                  isActive(l.href) ? "bg-ae-soft text-ae-dark" : "text-neutral-800 hover:bg-ae-bg"
                }`}
              >
                {l.label}
                <ArrowRight className="h-4 w-4 text-neutral-400" />
              </a>
            ))}
          </nav>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Popular pickles</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {featured.map((p) => (
              <li key={p.slug}>
                <a href={`/product/${p.slug}`} className="flex flex-col items-center rounded-2xl bg-ae-bg p-3 text-center">
                  <img src={p.image} alt="" className="h-16 w-16 object-contain mix-blend-multiply" />
                  <span className="mt-2 text-xs font-semibold text-neutral-800">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-2 pt-8">
            <a href="/products" className="flex items-center justify-center gap-2 rounded-full bg-ae py-3.5 text-sm font-semibold text-white">
              Shop Now <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="tel:+918091736987" className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 py-3.5 text-sm font-semibold text-neutral-800">
              <Phone className="h-4 w-4" /> +91 80917 36987
            </a>
            <div className="flex justify-center gap-2 pt-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-ae-bg text-ae-dark hover:bg-ae hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
