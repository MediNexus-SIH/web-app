import { Hospital, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import RevealAnimation from "./framer-motion/revealAnimation";
import { MouseEvent } from "react";
import { Button } from "./ui/button";

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
    <header className="px-4 lg:px-6 h-14 flex justify-between items-center border-b-2">
      <Link className="flex items-center justify-center" href="/">
        <Hospital className="h-6 w-6" />
        <span className="sr-only">MediNexus</span>
      </Link>
      <div className="ml-auto gap-4 hidden md:block sm:gap-6">
        <RevealAnimation className="flex justify-center items-center gap-4">
          <Link
            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
            href="/dashboard"
          >
            Dashboard
          </Link>
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
      </div>
      <DialogBar className="md:hidden" />
    </header>
  );
}

export function DialogBar({ className }: { className?: string }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToSection("features-section");
  };

  const menuItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Features", onClick: handleScroll },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Get Started", href: "/auth/signup" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-xl flex flex-col space-y-4 backdrop-blur-xl bg-background/80 shadow-lg p-6 border">
        <AnimatePresence>
          {
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-4"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-primary hover:text-primary-focus transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Button
                      variant="ghost"
                      className="text-lg font-medium text-primary hover:text-primary-focus transition-colors duration-200"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </Button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          }
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
