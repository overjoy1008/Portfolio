"use client";

import type { ReactNode } from "react";
import { Header } from "./Header";
import { TableOfContents } from "./TableOfContents";
import { MusicPlayer } from "./MusicPlayer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <TableOfContents />
      {children}
      <MusicPlayer />
    </>
  );
}
