"use client";

import { useState } from "react";
import { AlignLeft, AtSign, User } from "lucide-react";
import { SocialLinks } from "./social-links";

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
    <section aria-labelledby="vm-heading-contact">
      <h2 id="vm-heading-contact" tabIndex={-1} className="vm-heading">Contact</h2>

      <div className="contact-grid">
        <div>
          <p className="contact-lede">Open for opportunities.</p>
          <p className="vm-lede">Ready for your message. Use the form to get in touch.</p>
          <SocialLinks size={18} labels />
        </div>

        <form aria-busy={status === "sending"} onSubmit={handleSubmit} className="contact-form">
          <div className="form-pair">
            <div className="form-field">
              <label htmlFor="contact-name"><User size={15} aria-hidden="true" /> Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your Name" maxLength={100} required />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email"><AtSign size={15} aria-hidden="true" /> Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="user@domain.com" maxLength={254} required />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="contact-message"><AlignLeft size={15} aria-hidden="true" /> Message</label>
            <textarea id="contact-message" name="message" rows={5} placeholder="Type your message here..." maxLength={5000} required />
          </div>
          {/* Formspree's honeypot: bots fill it and Formspree drops the submission. Hidden from people and assistive tech. */}
          <input type="text" name="_gotcha" className="form-gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="form-actions">
            <button type="submit" disabled={status === "sending"} className="btn btn-primary">
              {status === "sending" ? "Sending…" : status === "success" ? "Message sent" : "Send message"}
            </button>
            <span className="form-state" data-state={status} aria-hidden="true">{status === "sending" ? "running" : status === "success" ? "sent" : status === "error" ? "error" : "ready"}</span>
          </div>
          <div className="form-status" role="status" aria-live="polite" aria-atomic="true">
            {status === "success" && <p className="form-ok">Message sent. I&apos;ll get back to you shortly.</p>}
            {status === "error" && <p className="form-error">The message could not be sent. Please try again.</p>}
          </div>
          <p className="form-note">Sent through Formspree and only used to reply to you.</p>
        </form>
      </div>
    </section>
  );
}
