import { Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section className="fade-border grid gap-10 rounded-4xl bg-linear-to-br from-slate-900/80 via-slate-900/40 to-slate-800/60 p-8 lg:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Availability</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">Contact me through my form or by email.</h3>
          <p className="mt-3 text-slate-300">
            Remote-friendly from the US. I&apos;d love to hear from you. Share a few details and I&apos;ll follow up within one business
            day.
          </p>
        </div>
        <a
          href="mailto:hello@andrewnguyen.dev"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-100"
        >
          <Mail className="h-5 w-5" />
          Email Andrew
        </a>
      </div>

      <form className="rounded-[28px] border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-200">
        <p className="text-base font-medium text-white">Contact Form</p>
        <p className="mt-1 text-xs text-slate-400">
          Temporary form — let me know the best way to reach you and I&apos;ll reply manually.
        </p>
        <div className="mt-5 grid gap-4">
          <div>
            <label htmlFor="contact-name" className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-white/40"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="email@address.com"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-white/40"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">
              Message details
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Type here..."
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-white/40"
            />
          </div>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-3 font-medium text-white transition hover:bg-white/20 disabled:opacity-60"
          >
            Send message (coming soon)
          </button>
        </div>
      </form>
    </section>
  );
}
