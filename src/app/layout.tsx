import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EmotionalIndexProvider } from "./context/EmotionalIndexContext"; // Import the provider
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import GlobalMusicPlayer from "../components/common/GlobalMusicPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H&Z Love Station", 
  description: "Our exclusive space for memories and love.", 
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
        <EmotionalIndexProvider>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <GlobalMusicPlayer />
        </EmotionalIndexProvider> 
      </body>
    </html>
  );
}
