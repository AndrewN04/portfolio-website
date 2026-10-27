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
    <section id="contact" tabIndex={-1} aria-labelledby="contact-heading" className="section-shell pb-24 sm:pb-32" style={{ "--layer": "var(--z3)" } as React.CSSProperties}>
      <div className="settle mx-auto max-w-7xl px-4 sm:px-6">
        <div className="section-head">
          <h2 id="contact-heading" className="section-title"><span className="mask"><span>Contact</span></span></h2>
          <span className="layer-tag" aria-hidden="true">&lt;Contact /&gt;</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="wide max-w-md text-2xl font-bold leading-tight sm:text-3xl">Open for opportunities.</p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--text-muted)]">Ready for your message. Use the form to get in touch.</p>
          </div>

          <div>
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
                <button type="submit" disabled={status === "sending"} className="keycap keycap-paper min-w-44">
                  {status === "sending" ? "Sending…" : status === "success" ? "Message sent" : "Send message"}
                </button>
                <span className="mono text-xs text-[var(--text-muted)]" aria-hidden="true">{status === "sending" ? "running" : status === "success" ? "sent" : status === "error" ? "error" : "ready"}</span>
              </div>
              <div className="mt-4 min-h-6 text-sm" role="status" aria-live="polite" aria-atomic="true">
                {status === "success" && <p className="text-[var(--z3)]">Message sent. I&apos;ll get back to you shortly.</p>}
                {status === "error" && <p className="text-[var(--z2)]">The message could not be sent. Please try again.</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
