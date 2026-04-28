import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "../FloatingWhatsApp";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}