"use client";

import { useState } from "react";
import { AlignLeft, AtSign, User } from "lucide-react";

const FORM_ENDPOINT = "https://formspree.io/f/mjkjlqdn";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-heading" className="section-shell pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="section-heading">
          <span className="section-index">03</span>
          <div>
            <h2 id="contact-heading" className="section-title">Contact</h2>
            <p className="section-command"><span className="syntax-green">$</span> ./init_contact_form.sh</p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="max-w-md text-xl leading-relaxed text-[var(--text)] sm:text-2xl">Open for opportunities.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">Ready for your message. Use the form to get in touch.</p>
          </div>

          <form aria-busy={status === "sending"} onSubmit={handleSubmit} className="contact-form">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="form-field">
                <label htmlFor="contact-name"><User size={15} aria-hidden="true" /> Name</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your Name" required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email"><AtSign size={15} aria-hidden="true" /> Email</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="user@domain.com" required />
              </div>
            </div>
            <div className="form-field mt-6">
              <label htmlFor="contact-message"><AlignLeft size={15} aria-hidden="true" /> Message</label>
              <textarea id="contact-message" name="message" rows={5} placeholder="Type your message here..." required />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === "sending"} className="button-primary min-w-44 disabled:cursor-not-allowed disabled:opacity-60">
                <span className="syntax-green">$</span> {status === "sending" ? "Sending…" : status === "success" ? "Message sent" : "Send message"}
              </button>
              <span className="font-mono text-xs text-[var(--text-muted)]" aria-hidden="true">{status === "sending" ? "running" : status === "success" ? "sent" : status === "error" ? "error" : "ready"}</span>
            </div>
            <div className="mt-4 min-h-6 text-sm" role="status" aria-live="polite" aria-atomic="true">
              {status === "success" && <p className="text-[var(--green)]">[SUCCESS] Message transmitted. I&apos;ll get back to you shortly.</p>}
              {status === "error" && <p className="text-[#ff8b85]">[ERROR] Transmission failed. Please try again.</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
