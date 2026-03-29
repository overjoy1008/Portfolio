"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "../context/LanguageContext";
import { MusicProvider } from "../context/MusicContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <MusicProvider>{children}</MusicProvider>
    </LanguageProvider>
  );
}
