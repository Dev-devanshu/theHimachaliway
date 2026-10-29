import { Droplets, Leaf, Package, ShieldCheck, Sprout, Sun } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "No Preservatives" },
  { icon: Droplets, label: "Cold-Pressed Oil" },
  { icon: Sun, label: "Sun-Cured" },
  { icon: Leaf, label: "Small Batch" },
  { icon: Sprout, label: "Farm Sourced" },
  { icon: Package, label: "Pan-India Delivery" },
];

export default function Promise() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:gap-10">
      <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Our promise</p>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:flex-1 lg:justify-between">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-sm font-medium text-neutral-500">
            <Icon className="h-4 w-4 text-ae" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
