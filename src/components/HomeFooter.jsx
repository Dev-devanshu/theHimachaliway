import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Blogs", href: "/blogs" },
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Popular Pickles",
    links: [
      { label: "Aam Ka Aachar", href: "/product/aam-ka-aachar" },
      { label: "Galgal Ka Aachar", href: "/product/galgal-ka-aachar" },
      { label: "Garlic Aachar", href: "/product/garlic-aachar" },
      { label: "Aanwala Aachar", href: "/product/aanwala-aachar" },
      { label: "Download catalog", href: "/pdf/pdf.pdf" },
    ],
  },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/thehimachaliway/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1ECwaAVhmQ/" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@TheHimachaliWay" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/the-himachali-way/" },
];

export default function HomeFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <a href="/" className="flex items-center gap-2">
            <img src="/Home/logo.png" alt="The Himachali Way" className="h-12 w-12 object-contain" />
            <span className="text-xl text-neutral-900"><span className="font-medium">Himachali</span><span className="font-bold">Way</span></span>
          </a>
          <p className="mt-4 max-w-xs text-base leading-relaxed text-neutral-600">
            Authentic Himachali achar, handmade with local produce and cold-pressed mustard oil.
          </p>
          <ul className="mt-5 flex gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-9 w-9 place-items-center rounded-full bg-ae text-white transition hover:bg-ae-dark">
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold text-neutral-900">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-neutral-600 transition hover:text-ae">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-semibold text-neutral-900">Contact Us</p>
          <ul className="mt-4 space-y-3 text-sm text-neutral-600">
            <li>
              <a href="tel:+918091736987" className="flex items-center gap-2.5 hover:text-ae"><Phone className="h-4 w-4 text-ae" /> +91 80917 36987</a>
            </li>
            <li>
              <a href="mailto:thehimachaliway@gmail.com" className="flex items-center gap-2.5 break-all hover:text-ae"><Mail className="h-4 w-4 shrink-0 text-ae" /> thehimachaliway@gmail.com</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ae" />
              Village Seo, PO Naswal, Tehsil Ghumarwin, District Bilaspur, HP 174021
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-sm text-neutral-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} The Himachali Way. All rights reserved. Made with ♥ in Himachal.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/privacy-policy" className="hover:text-ae">Privacy Policy</a>
            <a href="/terms" className="hover:text-ae">Terms & Conditions</a>
            <a href="/shipping-returns" className="hover:text-ae">Shipping & Returns</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
