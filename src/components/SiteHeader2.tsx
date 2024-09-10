import { Hospital } from "lucide-react";
import Link from "next/link";
import RevealAnimation from "./framer-motion/revealAnimation";

export function SiteHeader2() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b-2">
      <Link className="flex items-center justify-center" href="/">
        <Hospital className="h-6 w-6" />
        <span className="sr-only">MediNexus</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <RevealAnimation className="flex justify-center items-center gap-4">
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
