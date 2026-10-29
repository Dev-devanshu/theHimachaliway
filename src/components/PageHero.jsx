import { ChevronRight } from "lucide-react";
import { Chip } from "./ui";

export default function PageHero({ crumb, chip, title, text, image, children }) {
  return (
    <section className="px-3 pt-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-ae-bg">
        <img src={image} alt="" className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover lg:block" />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-r from-ae-bg via-ae-bg/30 to-transparent lg:block" />
        <div className="relative max-w-xl px-6 py-12 sm:px-10 sm:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-neutral-500">
            <a href="/" className="hover:text-ae">Home</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-neutral-800">{crumb}</span>
          </nav>
          <div className="mt-6"><Chip>{chip}</Chip></div>
          <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-[56px]">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">{text}</p>
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
