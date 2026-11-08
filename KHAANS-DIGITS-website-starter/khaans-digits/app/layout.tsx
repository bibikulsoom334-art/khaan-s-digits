import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KHAANS DIGITS | Digital Experiences",
  description: "Premium 3D websites and personalized digital wishes cards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}