import { Leaf } from "lucide-react";

export function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ae-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ae-dark">
      <Leaf className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

export function Initials({ names, size = "h-8 w-8" }) {
  return (
    <span className="flex -space-x-2">
      {names.map((n) => (
        <span key={n} className={`grid ${size} place-items-center rounded-full bg-ae text-[10px] font-bold text-white ring-2 ring-white`}>
          {n}
        </span>
      ))}
    </span>
  );
}
