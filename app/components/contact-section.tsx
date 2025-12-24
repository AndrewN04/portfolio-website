"use client";

import { useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/mjkjlqdn";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="py-20 bg-[#0c0e1a] border-t border-[#282b39]" id="contact">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="size-16 mx-auto bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
          <span className="material-symbols-outlined text-3xl">mail</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Interested in working together?</h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>

        {/* Contact Form - Preserved from original */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-[#1a1d2d] border border-slate-800 rounded-xl p-6 sm:p-8 text-left"
        >
          <p className="text-lg font-medium text-white mb-1">Contact Form</p>
          <p className="text-sm text-slate-400 mb-6">I typically reply within two to three business days.</p>

          <div className="grid gap-4">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-[#1337ec]"
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
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-[#1337ec]"
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
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-[#1337ec] resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#1337ec] hover:bg-[#0f2cb8] text-white h-12 px-8 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#1337ec]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "sending" ? "Sending…" : status === "success" ? "Message sent" : "Get in Touch"}
            </button>
          </div>

          <p className="mt-4 text-sm text-slate-400 text-center" aria-live="polite">
            {status === "success" && "Thanks for reaching out! I'll get back to you shortly."}
            {status === "error" && "Hmm—something went wrong. Could you try again in a moment?"}
          </p>
        </form>
      </div>
    </section>
  );
}
