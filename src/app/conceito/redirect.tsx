"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => router.replace(to), [router, to]);
  return (
    <p className="label container-x pt-32">
      Esta página agora se chama{" "}
      <Link href={to} className="underline underline-offset-4">
        Sobre nós
      </Link>
      .
    </p>
  );
}
