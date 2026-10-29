import { PackageCheck, Scissors, Sprout, Sun } from "lucide-react";
import { Chip } from "./ui";

const steps = [
  { icon: Sprout, title: "Handpicked Produce", text: "Seasonal mangoes, galgal, amla and chillies from small Himachali farms.", image: "/optimise/a13.jpg" },
  { icon: Scissors, title: "Cut & Spiced by Hand", text: "Washed, cut and mixed with freshly ground Pahadi spices.", image: "/optimise/a2.jpg" },
  { icon: Sun, title: "Slow Sun-Curing", text: "Cured for days under the sun in cold-pressed mustard oil.", image: "/optimise/a10.jpg" },
  { icon: PackageCheck, title: "Sealed & Shipped Fresh", text: "Checked, sealed in jars and delivered across India.", image: "/optimise/a14.jpg" },
];

export default function Process() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Chip>How it's made</Chip>
        <h2 className="mt-4 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl lg:text-[44px]">
          From <span className="text-ae">Farm</span> to Jar in 4 Steps
        </h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-600">
          No factories, no shortcuts. Just the slow, careful way Himachali families have always made achar.
        </p>
      </div>

      <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-6 hidden border-t-2 border-dashed border-ae/25 lg:block" />
        {steps.map(({ icon: Icon, title, text, image }, k) => (
          <li key={title} className="relative flex flex-col items-center text-center">
            <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-ae text-lg font-semibold text-white ring-8 ring-white">
              {k + 1}
            </span>
            <div className="group mt-6 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-44 overflow-hidden">
                <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ae-dark">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-neutral-500">{text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
