import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AppShell } from "../components/AppShell";

export const metadata: Metadata = {
  title: "Kyoungbin Park Portfolio",
  description: "A minimalist personal landing page for Kyoungbin Park with a typing animation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
