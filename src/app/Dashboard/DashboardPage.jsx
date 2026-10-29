import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Globe,
  Inbox,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const TABS = [
  { key: "", label: "All" },
  { key: "new", label: "New" },
  { key: "replied", label: "Replied" },
  { key: "closed", label: "Closed" },
];

const STATUS_STYLE = {
  new: { pill: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-500" },
  replied: { pill: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
  closed: { pill: "bg-neutral-100 text-neutral-600 ring-neutral-200", dot: "bg-neutral-400" },
};

const AVATAR_COLORS = ["bg-emerald-100 text-emerald-800", "bg-amber-100 text-amber-800", "bg-sky-100 text-sky-800", "bg-rose-100 text-rose-800", "bg-violet-100 text-violet-800"];

const toDate = (s) => new Date(`${s.replace(" ", "T")}Z`);
const fmtDate = (s) => toDate(s).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const timeAgo = (s) => {
  const mins = Math.round((Date.now() - toDate(s)) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (mins < 1440) return `${Math.round(mins / 60)} hr ago`;
  return `${Math.round(mins / 1440)} days ago`;
};
const initials = (name) => name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
const waNumber = (p) => {
  const d = (p || "").replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
};
const replyLinks = (q) => ({
  whatsapp: q.phone ? `https://wa.me/${waNumber(q.phone)}?text=${encodeURIComponent(`Hi ${q.name.split(" ")[0]}, thank you for contacting The Himachali Way about "${q.subject}".`)}` : null,
  call: q.phone ? `tel:${q.phone}` : null,
  email: `mailto:${q.email}?subject=${encodeURIComponent(`Re: ${q.subject}`)}`,
});
const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

function Avatar({ q, size = "h-10 w-10 text-sm" }) {
  return <span className={`grid ${size} shrink-0 place-items-center rounded-full font-semibold ${AVATAR_COLORS[q.id % AVATAR_COLORS.length]}`}>{initials(q.name)}</span>;
}

function StatusPill({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${STATUS_STYLE[status].pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLE[status].dot}`} />
      {status}
    </span>
  );
}

function DetailPanel({ q, onClose, onStatus }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const links = replyLinks(q);
  const rows = [
    { icon: Mail, label: "Email", value: q.email, href: `mailto:${q.email}` },
    { icon: Phone, label: "Phone", value: q.phone || "Not given", href: q.phone ? `tel:${q.phone}` : null },
    { icon: Clock, label: "Received", value: `${fmtDate(q.created_at)} · ${timeAgo(q.created_at)}` },
    { icon: Globe, label: "Country", value: q.country || "Unknown" },
  ];

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`Query from ${q.name}`}>
      <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-2xl sm:w-[480px]">
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <p className="text-sm font-semibold text-neutral-400">Query #{q.id}</p>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg text-neutral-500 hover:bg-neutral-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Avatar q={q} size="h-14 w-14 text-lg" />
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">{q.name}</h2>
              <div className="mt-1"><StatusPill status={q.status} /></div>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-neutral-100 rounded-2xl border border-neutral-200">
            {rows.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3">
                <Icon className="h-4 w-4 shrink-0 text-neutral-400" />
                <dt className="w-20 shrink-0 text-sm text-neutral-500">{label}</dt>
                <dd className="min-w-0 break-words text-sm font-medium text-neutral-900">
                  {href ? <a href={href} className="hover:text-ae">{value}</a> : value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-neutral-400">Subject</p>
          <p className="mt-1 text-lg font-semibold text-neutral-900">{q.subject}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Message</p>
          <p className="mt-2 whitespace-pre-line rounded-2xl bg-neutral-50 p-4 text-base leading-relaxed text-neutral-700">{q.message}</p>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-neutral-400">Status</p>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-neutral-100 p-1">
            {TABS.slice(1).map((t) => (
              <button
                key={t.key}
                onClick={() => onStatus(q.id, t.key)}
                aria-pressed={q.status === t.key}
                className={`rounded-lg py-2 text-sm font-semibold transition ${q.status === t.key ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-800"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2 border-t border-neutral-100 px-6 py-4 sm:grid-cols-3">
          {links.whatsapp && (
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-ae px-4 py-3 text-sm font-semibold text-white hover:bg-ae-dark">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          )}
          {links.call && (
            <a href={links.call} className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 hover:border-ae hover:text-ae">
              <Phone className="h-4 w-4" /> Call
            </a>
          )}
          <a href={links.email} className={`inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 hover:border-ae hover:text-ae ${links.whatsapp ? "" : "sm:col-span-3"}`}>
            <Mail className="h-4 w-4" /> Email
          </a>
        </div>
      </aside>
    </div>
  );
}

const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

function Trend({ value, suffix }) {
  if (value == null) return <span className="text-neutral-400">No data last week</span>;
  const up = value >= 0;
  return (
    <span className={`inline-flex items-center gap-1 font-semibold ${up ? "text-emerald-600" : "text-rose-500"}`}>
      {up ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
      {up ? "+" : ""}{value}{suffix}
      <span className="font-normal text-neutral-500">from last week</span>
    </span>
  );
}

function Metric({ label, value, icon: Icon, tint, children }) {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">{value ?? "–"}</p>
        </div>
        {Icon && (
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tint}`}>
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
      <div className="mt-3 text-sm">{children}</div>
    </div>
  );
}

const SEGMENTS = [
  { key: "new", label: "New", bar: "bg-amber-400", dot: "bg-amber-400" },
  { key: "replied", label: "Replied", bar: "bg-ae", dot: "bg-ae" },
  { key: "closed", label: "Closed", bar: "bg-ae-lime", dot: "bg-ae-lime" },
];

function Dashboard({ onSignedOut }) {
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(query.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const params = new URLSearchParams({ ...(status && { status }), ...(search && { q: search }), page: String(page) });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [res, sres] = await Promise.all([
        fetch(`/api/dashboard/queries?${params}`, { credentials: "same-origin" }),
        fetch("/api/dashboard/stats", { credentials: "same-origin" }),
      ]);
      if (res.status === 401) return onSignedOut();
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error(body.error || "Could not load queries"), { status: res.status });
      setData(body);
      if (sres.ok) setStats(await sres.json());
      setError(null);
    } catch (err) {
      setError({ message: err.message, status: err.status });
    } finally {
      setLoading(false);
    }
  }, [params.toString(), onSignedOut]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id, next) => {
    const prev = data;
    setData((d) => ({ ...d, items: d.items.map((q) => (q.id === id ? { ...q, status: next } : q)) }));
    const res = await fetch(`/api/dashboard/queries/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: next }),
    }).catch(() => null);
    if (!res?.ok) {
      setData(prev);
      alert("Could not update the status. Please try again.");
      return;
    }
    load();
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    onSignedOut();
  };

  const pick = (key) => {
    setStatus(key);
    setPage(1);
  };

  const c = data?.counts || {};
  const pages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;
  const exportHref = `/api/dashboard/export?${new URLSearchParams({ ...(status && { status }), ...(search && { q: search }) })}`;
  const open = data?.items.find((q) => q.id === openId);
  const closePanel = useCallback(() => setOpenId(null), []);
  const weekChange = stats && stats.prevWeek ? Math.round(((stats.week - stats.prevWeek) / stats.prevWeek) * 100) : null;
  const handled = (c.replied || 0) + (c.closed || 0);
  const latest = (data?.items || []).slice(0, 3);
  const dayDiff = stats ? stats.today - stats.yesterday : null;

  return (
    <div className="min-h-screen bg-neutral-50 font-urbanist text-neutral-900 antialiased">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1F3812] via-ae-dark to-[#2B4A17] pb-32 text-white">
        <span aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(214,238,118,0.45)_1px,transparent_1.5px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_80%_30%,black,transparent_65%)]" />

        <header className="relative mx-auto flex max-w-7xl items-center gap-4 px-5 pt-6 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white">
              <img src="/Home/logo.png" alt="" className="h-9 w-9 object-contain" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-base font-semibold leading-tight">Himachali Way</span>
              <span className="block text-xs text-white/60">Admin panel</span>
            </span>
          </div>

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold">Dashboard</span>
            <a href={exportHref} className="rounded-full px-5 py-2 text-sm font-medium text-white/75 hover:text-white">Export CSV</a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2 text-sm font-medium text-white/75 hover:text-white">View website</a>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <label className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 ring-1 ring-white/15 focus-within:bg-white/15 md:flex">
              <Search className="h-4 w-4 text-white/70" />
              <span className="sr-only">Search queries</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search anything here" className="w-48 bg-transparent text-sm text-white outline-none placeholder:text-white/50" />
            </label>
            <button onClick={() => pick("new")} aria-label={`${c.new || 0} new queries`} className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/20">
              <Bell className="h-5 w-5" />
              {c.new > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-ae-lime px-1 text-[10px] font-bold text-ae-dark">{c.new}</span>}
            </button>
            <button onClick={logout} title="Log out" aria-label="Log out" className="flex items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3 ring-1 ring-white/15 hover:bg-white/20">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ae-lime text-sm font-bold text-ae-dark">HW</span>
              <LogOut className="h-4 w-4 text-white/80" />
            </button>
          </div>
        </header>

        <div className="relative mx-auto max-w-7xl px-5 pt-10 sm:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{greeting()}, welcome back! 👋</h1>
          <label className="mt-5 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 ring-1 ring-white/15 md:hidden">
            <Search className="h-4 w-4 text-white/70" />
            <span className="sr-only">Search queries</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search queries…" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50" />
          </label>
          <div className="mt-6 flex gap-6 overflow-x-auto border-b border-white/15">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => pick(t.key)}
                aria-pressed={status === t.key}
                className={`-mb-px shrink-0 border-b-2 pb-3 text-sm font-medium transition ${status === t.key ? "border-ae-lime text-white" : "border-transparent text-white/60 hover:text-white"}`}
              >
                {t.key ? t.label : "Overview"} <span className="ml-1 text-xs text-white/50">{t.key ? c[t.key] ?? 0 : c.total ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="relative mx-auto -mt-24 max-w-7xl px-5 pb-16 sm:px-8">
        {error ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">{error.status === 503 ? "Dashboard access is not set up yet" : "Could not load queries"}</h2>
            <p className="mt-2 text-base text-neutral-500">{error.message}</p>
            <button onClick={load} className="mt-5 rounded-xl bg-ae px-5 py-2.5 text-sm font-semibold text-white hover:bg-ae-dark">Try again</button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            <div className="space-y-6">
              <section className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-500">Waiting for reply</p>
                  <button onClick={load} aria-label="Refresh" className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700">
                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  </button>
                </div>
                <p className="mt-2 text-4xl font-semibold tracking-tight">{c.new ?? "–"} <span className="text-base font-medium text-neutral-400">new {c.new === 1 ? "query" : "queries"}</span></p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button onClick={() => pick("new")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ae px-4 py-3 text-sm font-semibold text-white hover:bg-ae-dark">
                    <Inbox className="h-4 w-4" /> View new
                  </button>
                  <a href={exportHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ae-soft px-4 py-3 text-sm font-semibold text-ae-dark hover:bg-ae-lime/40">
                    <Download className="h-4 w-4" /> Export
                  </a>
                </div>
              </section>

              <section className="hidden rounded-3xl bg-white p-6 shadow-sm lg:block">
                <h2 className="text-lg font-semibold">Latest queries</h2>
                {latest.length === 0 ? (
                  <p className="mt-4 rounded-2xl bg-neutral-50 p-5 text-center text-sm text-neutral-500">No queries yet.</p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {latest.map((q) => (
                      <li key={q.id}>
                        <button onClick={() => setOpenId(q.id)} className="w-full rounded-2xl border border-neutral-200 p-4 text-left transition hover:border-ae/40 hover:shadow-sm">
                          <div className="flex items-center gap-3">
                            <Avatar q={q} size="h-10 w-10 text-xs" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-semibold">{q.name}</p>
                              <p className="truncate text-xs text-neutral-500">{q.subject}</p>
                            </div>
                            <StatusPill status={q.status} />
                          </div>
                          <p className="mt-3 line-clamp-2 text-sm text-neutral-600">{q.message}</p>
                          <p className="mt-2 text-xs text-neutral-400">{timeAgo(q.created_at)}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <div className="min-w-0 space-y-6">
              <section className="grid overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-2 md:divide-x md:divide-neutral-100">
                <div className="divide-y divide-neutral-100">
                  <Metric label="Received today" value={stats?.today} icon={CalendarDays} tint="bg-ae-soft text-ae-dark">
                    {dayDiff == null ? null : (
                      <span className={`inline-flex items-center gap-1 font-semibold ${dayDiff >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                        {dayDiff >= 0 ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                        {dayDiff >= 0 ? "+" : ""}{dayDiff} <span className="font-normal text-neutral-500">vs yesterday ({stats.yesterday})</span>
                      </span>
                    )}
                  </Metric>
                  <Metric label="Last 7 days" value={stats?.week} icon={BarChart3} tint="bg-amber-50 text-amber-600">
                    <Trend value={weekChange} suffix="%" />
                  </Metric>
                </div>
                <div className="divide-y divide-neutral-100 border-t border-neutral-100 md:border-t-0">
                  <Metric label="Reply rate" value={`${pct(handled, c.total)}%`}>
                    <p className="text-neutral-500">{handled} of {c.total || 0} queries replied or closed</p>
                    <div className="mt-3 flex h-2.5 gap-1">
                      <span className="rounded-full bg-ae" style={{ width: `${pct(handled, c.total)}%` }} />
                      <span className="flex-1 rounded-full bg-neutral-200" />
                    </div>
                  </Metric>
                  <div className="p-6">
                    <p className="text-sm text-neutral-500">Status breakdown</p>
                    <div className="mt-4 flex h-2.5 gap-1">
                      {c.total ? (
                        SEGMENTS.map((s) => (c[s.key] ? <span key={s.key} className={`rounded-full ${s.bar}`} style={{ width: `${pct(c[s.key], c.total)}%` }} /> : null))
                      ) : (
                        <span className="flex-1 rounded-full bg-neutral-200" />
                      )}
                    </div>
                    <ul className="mt-4 grid grid-cols-3 gap-2">
                      {SEGMENTS.map((s) => (
                        <li key={s.key}>
                          <button onClick={() => pick(s.key)} className="text-left">
                            <span className="flex items-center gap-1.5 text-xs text-neutral-500"><span className={`h-2 w-2 rounded-full ${s.dot}`} />{s.label}</span>
                            <span className="mt-0.5 block text-lg font-semibold">{c[s.key] || 0}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl bg-white shadow-sm">
                <div className="flex items-center justify-between px-6 pt-6">
                  <h2 className="text-lg font-semibold">Queries history</h2>
                  <span className="text-sm text-neutral-400">{data?.total ?? 0} {data?.total === 1 ? "query" : "queries"}{status ? ` · ${status}` : ""}</span>
                </div>

                {data && data.items.length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <Inbox className="mx-auto h-10 w-10 text-neutral-300" />
                    <p className="mt-4 text-base font-semibold text-neutral-800">{search || status ? "No queries match this filter" : "No queries yet"}</p>
                    <p className="mt-1 text-sm text-neutral-500">{search || status ? "Try a different search or tab." : "New contact form messages will show up here."}</p>
                  </div>
                ) : (
                  <>
                    <div className="mt-4 hidden overflow-x-auto md:block">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-neutral-100 text-neutral-400">
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-3 py-3 font-medium">Subject</th>
                            <th className="px-3 py-3 font-medium">Date</th>
                            <th className="px-3 py-3 font-medium">Phone</th>
                            <th className="px-6 py-3 text-right font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.items.map((q) => (
                            <tr key={q.id} onClick={() => setOpenId(q.id)} className="cursor-pointer border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar q={q} size="h-10 w-10 text-xs" />
                                  <div className="min-w-0">
                                    <p className="font-semibold text-neutral-900">{q.name}</p>
                                    <p className="max-w-[200px] truncate text-xs text-neutral-500">{q.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="max-w-[240px] px-3 py-4">
                                <p className="truncate font-medium text-neutral-800">{q.subject}</p>
                                <p className="truncate text-xs text-neutral-500">{q.message}</p>
                              </td>
                              <td className="px-3 py-4">
                                <p className="text-neutral-800">{toDate(q.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                                <p className="text-xs text-neutral-400">{toDate(q.created_at).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}</p>
                              </td>
                              <td className="px-3 py-4 text-neutral-700">{q.phone || "–"}</td>
                              <td className="px-6 py-4 text-right"><StatusPill status={q.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <ul className="mt-4 divide-y divide-neutral-100 md:hidden">
                      {data?.items.map((q) => (
                        <li key={q.id}>
                          <button onClick={() => setOpenId(q.id)} className="flex w-full gap-3 px-5 py-4 text-left hover:bg-neutral-50">
                            <Avatar q={q} />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="truncate font-semibold">{q.name}</p>
                                <StatusPill status={q.status} />
                              </div>
                              <p className="mt-0.5 truncate text-sm text-neutral-700">{q.subject}</p>
                              <p className="mt-0.5 text-xs text-neutral-400">{timeAgo(q.created_at)}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {data && pages > 1 && (
                  <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
                    <span className="text-sm text-neutral-500">Page {page} of {pages}</span>
                    <div className="flex gap-2">
                      <button disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Previous page" className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
                      <button disabled={page >= pages} onClick={() => setPage(page + 1)} aria-label="Next page" className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </main>

      {open && <DetailPanel q={open} onClose={closePanel} onStatus={updateStatus} />}
    </div>
  );
}

function NoAccess({ invalid }) {
  return (
    <div className="grid min-h-screen place-items-center bg-white px-5 font-urbanist text-neutral-900 antialiased">
      <div className="w-full max-w-sm text-center">
        <img src="/Home/logo.png" alt="The Himachali Way" className="mx-auto h-16 w-16 object-contain" />
        <span className="mx-auto mt-6 grid h-12 w-12 place-items-center rounded-full bg-neutral-100 text-neutral-500">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold">This page is private</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {invalid ? "This dashboard link is not valid or has been changed." : "Open your private dashboard link to continue."}
        </p>
        <a href="/" className="mt-6 inline-block text-sm font-semibold text-ae-dark hover:text-ae">← Back to website</a>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [state, setState] = useState("checking");

  useEffect(() => {
    document.title = "Dashboard | The Himachali Way";
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex, nofollow";
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  const checkSession = useCallback(async () => {
    const res = await fetch("/api/auth/me").catch(() => null);
    setState(res?.ok ? "in" : "out");
  }, []);

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("key");
    if (!key) {
      checkSession();
      return;
    }
    window.history.replaceState(null, "", "/dashboard");
    fetch("/api/auth/key", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ key }) })
      .then((res) => (res.ok ? checkSession() : setState("invalid")))
      .catch(() => setState("invalid"));
  }, [checkSession]);

  if (state === "checking")
    return (
      <div className="grid min-h-screen place-items-center bg-white font-urbanist">
        <RefreshCw className="h-6 w-6 animate-spin text-neutral-300" aria-label="Loading" />
      </div>
    );
  if (state !== "in") return <NoAccess invalid={state === "invalid"} />;
  return <Dashboard onSignedOut={checkSession} />;
}
