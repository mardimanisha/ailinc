"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { company } from "@/lib/content";
import clsx from "clsx";

export default function ContactForm({ className }: { className?: string }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [need, setNeed] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className={className}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!name.trim() || !contact.trim() || !email.trim() || sending) return;
          setSending(true);
          setError("");
          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, contact, need, email }),
            });
            if (!res.ok) throw new Error("Request failed");
            setSent(true);
            setName("");
            setContact("");
            setNeed("");
            setEmail("");
          } catch {
            setError("Something went wrong. Please try again.");
          } finally {
            setSending(false);
          }
        }}
        className="flex w-full max-w-md flex-col gap-3 rounded-3xl bg-ink-3/70 p-4 ring-1 ring-brand-soft/20 backdrop-blur-md"
      >
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Name"
          className="min-w-0 rounded-full bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none ring-1 ring-brand-soft/10 placeholder:text-paper-2/35 focus:ring-brand-2/40"
        />
        <input
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Phone number"
          aria-label="Contact number"
          className="min-w-0 rounded-full bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none ring-1 ring-brand-soft/10 placeholder:text-paper-2/35 focus:ring-brand-2/40"
        />
        <input
          type="text"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          placeholder="What do you want to build?"
          aria-label="What you want"
          className="min-w-0 rounded-full bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none ring-1 ring-brand-soft/10 placeholder:text-paper-2/35 focus:ring-brand-2/40"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your work email"
          aria-label="Work email"
          className="min-w-0 rounded-full bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none ring-1 ring-brand-soft/10 placeholder:text-paper-2/35 focus:ring-brand-2/40"
        />
        <motion.button
          type="submit"
          disabled={sending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="mt-1 shrink-0 rounded-full px-5 py-2.5 text-sm font-medium text-paper disabled:opacity-60"
          style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
        >
          {sent ? "Received" : sending ? "Sending…" : "Contact us"}
        </motion.button>
      </form>

      <motion.p
        animate={{ opacity: sent ? 1 : 0, y: sent ? 0 : -6 }}
        transition={{ duration: 0.5 }}
        className={clsx("mt-3 text-xs text-brand-2/80", !sent && "pointer-events-none")}
      >
        Thanks — we&apos;ll reply from {company.tech.emails[0]}.
      </motion.p>
      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
    </div>
  );
}
