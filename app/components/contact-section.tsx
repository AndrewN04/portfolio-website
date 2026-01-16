"use client";

import { useState, useEffect } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/mjkjlqdn";

// Format date like macOS terminal: "Fri Dec 26 14:30:45 2024"
const formatLoginTime = (date: Date): string => {
  return date
    .toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      year: "numeric",
    })
    .replace(",", "");
};

export function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [loginTime, setLoginTime] = useState<string | null>(null);

  // Set login time on client only to avoid hydration mismatch
  useEffect(() => {
    setLoginTime(formatLoginTime(new Date()));
  }, []);

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
      // Reset to idle state after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      // Reset to idle state after 4 seconds so user can retry
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            <span className="text-[#e5c07b]">&lt;</span>
            <span className="text-[#e5c07b] relative">
              Contact
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e5c07b] opacity-50"></span>
            </span>
            <span className="text-[#e5c07b]">/&gt;</span>
          </h2>
          <p className="font-mono text-slate-400 text-sm md:text-base mt-6">
            <span className="code-syntax-keyword">const</span>{" "}
            <span className="code-syntax-prop">status</span>{" "}
            <span className="text-slate-500">=</span>{" "}
            <span className="code-syntax-string">
              &quot;Open for opportunities&quot;
            </span>
            <span className="text-slate-500">;</span>
          </p>
        </div>

        {/* Enhanced Terminal Window */}
        <div className="rounded-xl overflow-hidden border border-white/20 bg-black shadow-2xl relative">
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 bg-black border-b border-white/10 relative z-10">
            <div className="flex gap-2">
              <div
                className="w-3 h-3 rounded-full bg-[#ff5f56]"
                aria-hidden="true"
              />
              <div
                className="w-3 h-3 rounded-full bg-[#ffbd2e]"
                aria-hidden="true"
              />
              <div
                className="w-3 h-3 rounded-full bg-[#27c93f]"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 md:p-6 font-mono text-sm">
            {/* Terminal Output */}
            <div className="text-slate-500 mb-1">
              Last login: {loginTime ?? "..."}
            </div>
            <div className="mb-1">
              <span className="text-[#61afef]">system@portfolio</span>
              <span className="text-slate-500">:</span>
              <span className="text-[#98c379]">~/contact</span>
              <span className="text-slate-400">
                <span className="text-[#98c379]">$</span> ./init_contact_form.sh
              </span>
            </div>
            <div className="text-slate-400 mb-6">
              Initializing secure connection...{" "}
              <span className="text-white">Done.</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black border border-white/20 rounded-md mb-2">
                  <span
                    className="material-symbols-outlined text-slate-400 text-base"
                    aria-hidden="true"
                  >
                    person
                  </span>
                  <span className="text-slate-300 text-xs">--name-string</span>
                </div>
                <div className="flex items-center gap-3 pl-2">
                  <span className="text-emerald-400" aria-hidden="true">
                    →
                  </span>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="flex-1 bg-transparent border-none outline-none text-slate-300 placeholder:text-slate-600 py-2"
                    aria-label="Your name"
                  />
                </div>
                <div className="h-px bg-white/20 ml-6 mt-1" />
              </div>

              {/* Email Field */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black border border-white/20 rounded-md mb-2">
                  <span
                    className="material-symbols-outlined text-slate-400 text-base"
                    aria-hidden="true"
                  >
                    alternate_email
                  </span>
                  <span className="text-slate-300 text-xs">
                    --email-address
                  </span>
                </div>
                <div className="flex items-center gap-3 pl-2">
                  <span className="text-emerald-400" aria-hidden="true">
                    →
                  </span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="user@domain.com"
                    required
                    className="flex-1 bg-transparent border-none outline-none text-slate-300 placeholder:text-slate-600 py-2"
                    aria-label="Your email address"
                  />
                </div>
                <div className="h-px bg-white/20 ml-6 mt-1" />
              </div>

              {/* Message Field */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black border border-white/20 rounded-md mb-2">
                  <span
                    className="material-symbols-outlined text-slate-400 text-base"
                    aria-hidden="true"
                  >
                    notes
                  </span>
                  <span className="text-slate-300 text-xs">--message-body</span>
                </div>
                <div className="flex items-start gap-3 pl-2">
                  <span className="text-emerald-400 mt-2" aria-hidden="true">
                    →
                  </span>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Type your message here..."
                    required
                    className="flex-1 bg-transparent border-none outline-none text-slate-300 placeholder:text-slate-600 py-2 resize-none"
                    aria-label="Your message"
                  />
                </div>
                <div className="h-px bg-white/20 ml-6 mt-1" />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-between px-4 py-3 bg-black hover:bg-gray-900 border border-white/20 hover:border-white/40 rounded-lg transition-all group disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#98c379] font-bold">$</span>
                    <span className="text-slate-300">
                      {status === "sending"
                        ? "sending_message.sh"
                        : status === "success"
                        ? "message_sent.sh"
                        : "sh send_message.sh"}
                    </span>
                    <span
                      className="w-2 h-4 bg-slate-400 animate-pulse"
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded uppercase tracking-wider font-bold ${
                      status === "success"
                        ? "bg-white/20 text-white"
                        : status === "error"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-white/20 text-white group-hover:bg-white/30"
                    }`}
                  >
                    {status === "success"
                      ? "sent"
                      : status === "error"
                      ? "error"
                      : status === "sending"
                      ? "running"
                      : "active"}
                  </span>
                </button>
              </div>

              {/* Status Message */}
              <div className="text-center text-sm" aria-live="polite">
                {status === "success" && (
                  <p className="text-white">
                    <span className="text-slate-500">[SUCCESS]</span> Message
                    transmitted. I&apos;ll get back to you shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-400">
                    <span className="text-slate-500">[ERROR]</span> Transmission
                    failed. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
