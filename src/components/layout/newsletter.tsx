"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icons/icon";
import { newsletter } from "@/data/copy";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!EMAIL.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <label htmlFor="newsletter-email" className="serif block text-h4 text-linho">
        {newsletter.title}
      </label>
      <div className="mt-6 flex items-end gap-3 border-b border-linho/30 pb-2 focus-within:border-cobre">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={newsletter.placeholder}
          aria-invalid={status === "error" || undefined}
          aria-describedby="newsletter-status"
          className="min-w-0 flex-1 bg-transparent py-2 text-body text-linho placeholder:text-linho/45 focus:outline-none"
        />
        <button type="submit" className="label flex shrink-0 items-center gap-2 py-2 text-linho hover:text-cobre">
          {newsletter.button}
          <Icon name="broto" size={18} />
        </button>
      </div>
      <p id="newsletter-status" role="status" className="label mt-3 min-h-5 text-linho/70">
        {status === "ok" && newsletter.success}
        {status === "error" && newsletter.invalid}
      </p>
    </form>
  );
}
