import { ArrowRight, ChefHat, Clock, Search, Share2, UtensilsCrossed, X } from "lucide-react";
import { useEffect, useState } from "react";
import { blogContent, blogPosts } from "../../data/blog";
import CtaBanner from "../../components/CtaBanner";
import { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import PageHero from "../../components/PageHero";

const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];
const postFromHash = () => {
  const m = window.location.hash.match(/^#?post-(\d+)$/);
  return m ? blogPosts.find((p) => p.id === Number(m[1])) || null : null;
};

function Meta({ p, light = false }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${light ? "text-white/80" : "text-neutral-500"}`}>
      <span>{fmt(p.date)}</span>
      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.minutes} min read</span>
      <span>By {p.author}</span>
    </p>
  );
}

function Reader({ post, onClose }) {
  const c = blogContent[post.id];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const share = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label={post.title}>
      <article className="relative mx-auto my-6 max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-2xl sm:my-12" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-64 sm:h-80">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute right-4 top-4 flex gap-2">
            <button onClick={share} className="flex h-10 items-center gap-2 rounded-full bg-white/90 px-4 text-sm font-semibold text-neutral-800">
              <Share2 className="h-4 w-4" /> {copied ? "Link copied" : "Share"}
            </button>
            <button onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-neutral-800">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-10">
            <span className="rounded-full bg-ae-lime px-3 py-1 text-xs font-semibold text-ae-dark">{post.category}</span>
            <h2 className="mt-3 text-2xl font-medium leading-tight text-white sm:text-4xl">{post.title}</h2>
            <div className="mt-2"><Meta p={post} light /></div>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-lg leading-relaxed text-neutral-700">{c?.intro || post.excerpt}</p>

          {c && (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-2xl bg-ae-bg p-4">
                  <UtensilsCrossed className="h-5 w-5 text-ae" />
                  <span><span className="block text-xs text-neutral-500">Makes</span><span className="block text-sm font-semibold">{c.yield}</span></span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-ae-bg p-4">
                  <ChefHat className="h-5 w-5 text-ae" />
                  <span><span className="block text-xs text-neutral-500">Difficulty</span><span className="block text-sm font-semibold">{c.difficulty}</span></span>
                </div>
              </div>

              <h3 className="mt-10 text-xl font-semibold">Ingredients</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {c.ingredients.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-base text-neutral-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ae" />
                    {x}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-xl font-semibold">Method</h3>
              <ol className="mt-4 space-y-4">
                {c.steps.map((x, k) => (
                  <li key={x} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ae text-sm font-semibold text-white">{k + 1}</span>
                    <p className="pt-1 text-base leading-relaxed text-neutral-700">{x}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-3xl bg-ae-lime/40 p-6">
                <h3 className="text-lg font-semibold text-ae-dark">Kitchen tips</h3>
                <ul className="mt-3 space-y-2">
                  {c.tips.map((x) => (
                    <li key={x} className="text-base text-ae-dark/90">• {x}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600">#{t}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

export function BlogPage() {
  const [open, setOpen] = useState(postFromHash);
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const sync = () => setOpen(postFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const show = (p) => {
    window.location.hash = `post-${p.id}`;
  };
  const close = () => {
    history.pushState(null, "", window.location.pathname);
    setOpen(null);
  };

  const q = query.trim().toLowerCase();
  const posts = blogPosts.filter(
    (p) => (cat === "All" || p.category === cat) && (!q || `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(q)),
  );
  const [featured, ...rest] = blogPosts;

  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        <PageHero
          crumb="Blogs"
          chip="From our kitchen"
          title={<>Recipes & <span className="text-ae">Pickle</span> Stories</>}
          text="Traditional Himachali recipes, fermentation guides and kitchen tips to make the perfect achar at home."
          image="/optimise/a12.jpg"
        />

        <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
          <button onClick={() => show(featured)} className="group grid w-full overflow-hidden rounded-[28px] border border-neutral-200 text-left transition hover:shadow-xl lg:grid-cols-2">
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full lg:min-h-[380px]">
              <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-full bg-ae-lime px-3 py-1 text-xs font-semibold text-ae-dark">Featured</span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="w-fit rounded-full bg-ae-soft px-3 py-1 text-xs font-semibold text-ae-dark">{featured.category}</span>
              <h2 className="mt-4 text-2xl font-medium leading-tight sm:text-4xl">{featured.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">{featured.excerpt}</p>
              <div className="mt-4"><Meta p={featured} /></div>
              <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-ae-dark group-hover:text-ae">
                Read the recipe <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCat(c)}
                    aria-pressed={cat === c}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-ae text-white" : "bg-ae-bg text-neutral-700 hover:bg-ae-soft"}`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 lg:w-72">
              <Search className="h-4 w-4 shrink-0 text-neutral-400" />
              <span className="sr-only">Search recipes</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search recipes…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400" />
            </label>
          </div>

          {posts.length === 0 ? (
            <div className="mt-8 rounded-3xl bg-ae-bg px-6 py-14 text-center">
              <p className="text-base text-neutral-600">No recipe matches your search.</p>
              <button onClick={() => { setCat("All"); setQuery(""); }} className="mt-4 rounded-full bg-ae px-5 py-2.5 text-sm font-semibold text-white hover:bg-ae-dark">
                Show all recipes
              </button>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(cat === "All" && !q ? rest : posts).map((p) => (
                <li key={p.id}>
                  <button onClick={() => show(p)} className="group flex h-full w-full flex-col text-left">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
                      <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800">{p.category}</span>
                    </div>
                    <div className="mt-4"><Meta p={p} /></div>
                    <h3 className="mt-1.5 text-lg font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-base text-neutral-500">{p.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 group-hover:text-ae">
                      Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <CtaBanner />
      </main>
      <HomeFooter />
      {open && <Reader post={open} onClose={close} />}
    </div>
  );
}

export default BlogPage;
