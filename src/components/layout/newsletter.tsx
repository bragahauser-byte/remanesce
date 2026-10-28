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
      <label htmlFor="newsletter-email" className="block text-h3">
        Receba as próximas <span className="kicker">sementes.</span>
      </label>
      <div className="mt-6 flex items-center gap-2 rounded-full border border-papel/25 p-1.5 pl-5 focus-within:border-papel/60">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={newsletter.placeholder}
          aria-invalid={status === "error" || undefined}
          aria-describedby="newsletter-status"
          className="min-w-0 flex-1 bg-transparent py-2 text-body text-papel placeholder:text-papel/45 focus:outline-none"
        />
        <button type="submit" className="pill min-h-11 bg-papel px-5 text-tinta hover:bg-branco">
          {newsletter.button}
          <Icon name="broto" size={18} />
        </button>
      </div>
      <p id="newsletter-status" role="status" className="mt-3 min-h-5 text-small text-papel/70">
        {status === "ok" && newsletter.success}
        {status === "error" && newsletter.invalid}
      </p>
    </form>
  );
}
