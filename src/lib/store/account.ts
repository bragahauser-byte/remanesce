import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Booking = {
  protocol: string;
  service: "reparo" | "ajuste" | "ressignificar";
  serviceLabel: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  createdAt: string;
};

type AccountState = {
  user: { name: string; email: string } | null;
  bookings: Booking[];
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  book: (booking: Booking) => void;
};

/** "Minha Remanesce": login simulado (só nome e e-mail) e serviços agendados. */
export const useAccount = create<AccountState>()(
  persist(
    (set) => ({
      user: null,
      bookings: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      book: (booking) => set((s) => ({ bookings: [booking, ...s.bookings] })),
    }),
    { name: "remanesce:conta", version: 1 },
  ),
);
