"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import ContactForm from "./ContactForm";

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-11 right-0 grid size-9 place-items-center rounded-full bg-ink-3/80 text-paper ring-1 ring-brand-soft/25 transition-opacity hover:opacity-70"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-4">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <ContactForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
