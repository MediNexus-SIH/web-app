"use client";
import RevealAnimation from "@/components/framer-motion/revealAnimation";
import { SmoothTextReveal } from "@/components/framer-motion/smoothTextReveal";
import GithubBadge from "@/components/GithubBadge";
import { Icons } from "@/components/Icons";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  BarChart2Icon,
  Box,
  Clipboard,
  Search,
  ShieldCheck,
  Truck,
  TruckIcon,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import TypewriterTitle from "@/components/TypeWriterTitle";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex-grow bg-background items-center p-8 lg:p-12 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex flex-col justify-center items-center">
            <RevealAnimation className="my-5">
              <GithubBadge />
            </RevealAnimation>
            <div className="text-center text-4xl sm:text-6xl font-bold">
              <TypewriterTitle />
            </div>
            <div className="text-center text-foreground">
              <SmoothTextReveal
                className="text-xl sm:text-2xl lg:text-3xl tracking-tight font-semibold"
                text="Streamline Your Hospital Supply Chain"
                direction="right"
                animation="easeIn"
              />
              <SmoothTextReveal
                className="mt-2 text-md sm:text-lg lg:text-2xl leading-6 text-gray-600 dark:text-gray-200"
                text="Efficient inventory management, seamless supply chain,"
                direction="left"
              />
              <SmoothTextReveal
                className="text-md sm:text-lg lg:text-2xl leading-6 text-gray-600 dark:text-gray-200"
                text="and intelligent demand forecasting for modern healthcare facilities."
                direction="left"
              />
            </div>
            <div className="flex flex-col space-y-10">
              <div className="mt-8 flex gap-4">
                <RevealAnimation className="flex justify-center items-center gap-4">
                  <Link
                    href="https://github.com/MediNexus-SIH/web-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Button>
                      Go to GitHub{" "}
                      <Icons.arrowRight className="pl-0.5" size={16} />
                    </Button>
                  </Link>
                  <Button variant="secondary">Contact Us</Button>
                </RevealAnimation>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UtilsSection />
      <FeaturesSection />
      <PumpUpSection />
    </div>
  );
};

export default HomePage;

const UtilsSection = () => {
  return (
    <section
      id="utils-section"
      className="w-full py-12 md:py-16 lg:py-24 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <RevealAnimation>
            <div className="flex flex-col items-center space-y-4 border-gray-200 p-6 rounded-lg">
              <Box className="h-10 w-10 text-blue-500" />
              <h2 className="text-xl font-bold">Inventory Management</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Real-time tracking and optimization of medical supplies and
                equipment.
              </p>
            </div>
          </RevealAnimation>
          <RevealAnimation>
            <div className="flex flex-col items-center space-y-4 border-gray-200 p-6 rounded-lg">
              <Truck className="h-10 w-10 text-green-500" />
              <h2 className="text-xl font-bold">Supply Chain Visibility</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                End-to-end visibility and control over your healthcare supply
                chain.
              </p>
            </div>
          </RevealAnimation>
          <RevealAnimation>
            <div className="flex flex-col items-center space-y-4 border-gray-200 p-6 rounded-lg">
              <BarChart2 className="h-10 w-10 text-purple-500" />
              <h2 className="text-xl font-bold">Demand Forecasting</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                AI-powered demand prediction for optimal stock levels and
                reduced waste.
              </p>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Clipboard,
      title: "Inventory Management",
      description: "Real-time tracking and optimization of medical supplies",
    },
    {
      icon: TruckIcon,
      title: "Supply Chain Visibility",
      description:
        "End-to-end visibility and control over your healthcare supply chain",
    },
    {
      icon: BarChart2Icon,
      title: "Demand Forecasting",
      description: "AI-powered prediction for optimal stock levels",
    },
    {
      icon: Search,
      title: "Order Tracking",
      description: "Real-time updates on order status and location",
    },
    {
      icon: ShieldCheck,
      title: "Compliance Management",
      description: "Ensure adherence to healthcare regulations and standards",
    },
    {
      icon: Zap,
      title: "Automated Reordering",
      description: "Smart reordering based on usage patterns and forecasts",
    },
  ];
  return (
    <section
      id="features-section"
      className="py-20 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Our Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-primary">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PumpUpSection = () => {
  return (
    <section className="py-20 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Hospital Operations?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of healthcare facilities already benefiting from our
          advanced supply chain solutions.
        </p>
        <Button variant="outline" className="text-lg">
          Request a Demo
        </Button>
      </div>
    </section>
  );
};
