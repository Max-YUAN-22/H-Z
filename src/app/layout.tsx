import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EmotionalIndexProvider } from "./context/EmotionalIndexContext"; // Import the provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H&Z 空间 - 情侣纪念互动平台", // Updated title
  description: "为情侣提供独特、浪漫、个性化的回忆与互动平台。", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EmotionalIndexProvider>{children}</EmotionalIndexProvider> {/* Wrap with provider */}
      </body>
    </html>
  );
}
