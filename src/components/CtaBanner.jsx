import { ArrowRight, Phone } from "lucide-react";
import { Initials } from "./ui";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-20">
      <div className="relative overflow-hidden rounded-[28px]">
        <img src="/optimise/a19.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ae-dark via-ae-dark/85 to-ae-dark/10" />
        <div className="relative max-w-xl px-6 py-12 sm:px-12 sm:py-16">
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-[42px]">
            Ready to Taste the <span className="text-ae-lime">Hills?</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
            Order your favourite achar, plan a bulk order or build a festive gift hamper. We're a call away.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/products" className="inline-flex items-center gap-2 rounded-full bg-ae-lime px-6 py-3 text-sm font-semibold text-ae-dark transition hover:brightness-95">
              Shop Now <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:+918091736987" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              <Phone className="h-4 w-4" /> +91 80917 36987
            </a>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Initials names={["AM", "NK", "IK"]} size="h-7 w-7" />
            <span className="text-sm text-white/80">Trusted by 10,000+ families</span>
          </div>
        </div>
      </div>
    </section>
  );
}
