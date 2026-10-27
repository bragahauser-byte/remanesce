import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountView } from "@/components/account/account-view";

export const metadata: Metadata = { title: "Minha Remanesce", robots: { index: false } };

export default function AccountPage() {
  return (
    <div className="container-x pt-[calc(var(--spacing-header)+3rem)] md:pt-[calc(var(--spacing-header)+5rem)]">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <AccountView />
      </Suspense>
    </div>
  );
}
