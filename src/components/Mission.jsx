import { ArrowRight, Droplets, HandHeart, Sun } from "lucide-react";
import { Chip } from "./ui";

const cards = [
  { icon: Sun, title: "Sun-Cured Tradition", text: "Slow natural curing, just like Pahadi home kitchens.", image: "/optimise/a10.jpg" },
  { icon: Droplets, title: "Cold-Pressed Oil", text: "Pure mustard oil, no cheap fillers.", image: "/optimise/a11.jpg" },
  { icon: HandHeart, title: "Local Farmers", text: "Produce from 20+ small Himachali farms.", image: "/optimise/a16.jpg" },
];

export default function Mission() {
  return (
    <section className="px-3 sm:px-5">
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[28px] bg-ae-bg px-5 py-14 sm:px-10 lg:grid-cols-[0.9fr_1.4fr] lg:py-16">
        <div>
          <Chip>Our mission</Chip>
          <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-[44px]">
            We're Bringing <span className="text-ae">Pahadi</span> Flavours to Every Indian Kitchen.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600">
            Through traditional recipes, honest ingredients and small-batch care, we keep the
            taste of Himachal alive in every jar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/products" className="inline-flex items-center gap-2 rounded-full bg-ae px-5 py-3 text-sm font-semibold text-white transition hover:bg-ae-dark">
              Explore Products <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/about-us" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition hover:shadow-md">
              Learn More
            </a>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, image }) => (
            <li key={title} className="relative h-[300px] overflow-hidden rounded-3xl sm:h-[380px]">
              <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ae-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-tight">{title}</h3>
                <p className="mt-1 text-sm text-white/80">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
