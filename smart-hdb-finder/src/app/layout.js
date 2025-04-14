"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/header";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {/* Render Header only on non-homepage */}
        {pathname !== "/" && <Header />}
        
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        
        {/* Render Footer only on non-homepage */}
        {pathname !== "/" && <Footer />}
      </body>
    </html>
  );
}