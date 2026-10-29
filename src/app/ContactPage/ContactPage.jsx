import { ErrorMessage, Field, Form, Formik } from "formik";
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contactSchema, PHONE } from "../../data/contact";
import Faq from "../../components/Faq";
import { HomeHeader } from "../../components/Hero";
import HomeFooter from "../../components/HomeFooter";
import PageHero from "../../components/PageHero";

const ADDRESS = "Village Seo, PO Naswal, Tehsil Ghumarwin, District Bilaspur, Himachal Pradesh 174021";

const cards = [
  { icon: Phone, title: "Call / WhatsApp", text: "+91 80917 36987", href: "tel:+918091736987" },
  { icon: Mail, title: "Email", text: "thehimachaliway@gmail.com", href: "mailto:thehimachaliway@gmail.com" },
  { icon: MapPin, title: "Address", text: "Village Seo, Ghumarwin, Bilaspur, HP 174021", href: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}` },
  { icon: Clock, title: "Hours", text: "Mon–Sat, 10am–6pm IST" },
];

const fields = [
  { name: "name", label: "Full name", placeholder: "Your name" },
  { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
  { name: "phone", label: "Phone (optional)", placeholder: "+91 98xxxxxx", type: "tel" },
  { name: "subject", label: "Subject", placeholder: "Order, bulk enquiry, feedback…" },
];

const whatsappText = (v) =>
  `New contact form enquiry\nName: ${v.name.trim()}\nEmail: ${v.email.trim()}\nPhone: ${(v.phone || "").trim() || "-"}\nSubject: ${v.subject.trim()}\n\nMessage:\n${v.message.trim()}`;

function ContactForm() {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const input = (bad) =>
    `mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-base outline-none transition placeholder:text-neutral-400 focus:ring-4 ${bad ? "border-red-400 focus:ring-red-100" : "border-neutral-200 focus:border-ae focus:ring-ae/15"}`;

  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "", subject: "", message: "", website: "" }}
      validationSchema={contactSchema}
      onSubmit={async (v) => {
        let saved = null;
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(v),
          });
          if (res.ok) saved = await res.json();
        } catch {
          saved = null;
        }
        if (saved) {
          navigate("/thank-you", { state: { name: v.name.trim(), id: saved.id, waText: whatsappText(v) } });
          return;
        }
        setStatus("We couldn't save your message, so we're opening WhatsApp with it. Just press send!");
        window.location.href = `https://wa.me/${PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText(v))}`;
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form noValidate className="relative rounded-[28px] border border-neutral-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <p className="mt-1 text-base text-neutral-500">We usually reply within one business day.</p>
          <Field name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.name} className="block text-sm font-semibold text-neutral-800">
                {f.label}
                <Field name={f.name} type={f.type || "text"} placeholder={f.placeholder} className={input(touched[f.name] && errors[f.name])} />
                <ErrorMessage name={f.name} component="span" className="mt-1.5 block text-sm font-normal text-red-500" />
              </label>
            ))}
            <label className="block text-sm font-semibold text-neutral-800 sm:col-span-2">
              Message
              <Field as="textarea" name="message" rows={5} placeholder="Tell us how we can help…" className={input(touched.message && errors.message)} />
              <ErrorMessage name="message" component="span" className="mt-1.5 block text-sm font-normal text-red-500" />
            </label>
          </div>
          <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ae px-6 py-4 text-base font-semibold text-white transition hover:bg-ae-dark disabled:opacity-60 sm:w-auto">
            <Send className="h-4 w-4" /> {isSubmitting ? "Sending…" : "Send message"}
          </button>
          {status && <p role="status" className="mt-4 rounded-2xl bg-ae-soft px-4 py-3 text-sm font-medium text-ae-dark">{status}</p>}
        </Form>
      )}
    </Formik>
  );
}

export function ContactPage() {
  return (
    <div className="bg-white font-urbanist text-neutral-900 antialiased">
      <HomeHeader />
      <main>
        <PageHero
          crumb="Contact"
          chip="Get in touch"
          title={<>Let's Talk <span className="text-ae">Pickles</span></>}
          text="Questions about an order, a bulk enquiry for your café, or a festive hamper? We'd love to hear from you."
          image="/optimise/a17.jpg"
        >
          <a href="tel:+918091736987" className="inline-flex items-center gap-2 rounded-full bg-ae px-5 py-3 text-sm font-semibold text-white transition hover:bg-ae-dark">
            <Phone className="h-4 w-4" /> Call us
          </a>
          <a href={`https://wa.me/${PHONE.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition hover:shadow-md">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </PageHero>

        <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, title, text, href }) => {
              const body = (
                <>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ae-soft text-ae transition group-hover:bg-ae group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-5 block text-sm text-neutral-500">{title}</span>
                  <span className="mt-1 block break-words text-base font-semibold text-neutral-900">{text}</span>
                </>
              );
              return (
                <li key={title}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group block h-full rounded-3xl border border-neutral-200 p-6 transition hover:border-ae/40 hover:shadow-xl">{body}</a>
                  ) : (
                    <div className="group h-full rounded-3xl border border-neutral-200 p-6">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.4fr] lg:py-16">
          <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-ae-dark p-8 text-white">
            <img src="/optimise/a11.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="relative">
              <h2 className="text-3xl font-medium leading-tight">How can we help?</h2>
              <ul className="mt-6 space-y-4">
                {["Order support & tracking", "Wholesale / bulk enquiries", "Festive gift hampers", "Product feedback & suggestions"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-base text-white/90">
                    <span className="h-2 w-2 rounded-full bg-ae-lime" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-10 rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-white/70">Prefer to talk?</p>
                <a href="tel:+918091736987" className="mt-1 block text-2xl font-semibold text-ae-lime">+91 80917 36987</a>
              </div>
            </div>
          </div>
          <ContactForm />
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-[28px] border border-neutral-200">
            <iframe
              title="Map to The Himachali Way"
              src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex flex-col gap-3 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="flex items-start gap-3 text-base text-neutral-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ae" /> {ADDRESS}
              </p>
              <a href={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ae-soft px-5 py-2.5 text-sm font-semibold text-ae-dark hover:bg-ae hover:text-white">
                Open in Maps <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <Faq />
      </main>
      <HomeFooter />
    </div>
  );
}

export default ContactPage;
