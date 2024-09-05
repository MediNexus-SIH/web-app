import { Hospital } from "lucide-react";
import Link from "next/link";
import RevealAnimation from "./framer-motion/revealAnimation";
import { MouseEvent } from "react";
export function SiteHeader() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToSection("features-section");
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b-2">
      <Link className="flex items-center justify-center" href="/">
        <Hospital className="h-6 w-6" />
        <span className="sr-only">MediNexus</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <RevealAnimation className="flex justify-center items-center gap-4">
          <button
            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
            onClick={handleScroll}
          >
            Features
          </button>
          <Link
            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
            href="/auth/signup"
          >
            Get Started
          </Link>
        </RevealAnimation>
      </nav>
    </header>
  );
}
