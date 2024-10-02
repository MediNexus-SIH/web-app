"use client";
import RevealAnimation from "@/components/framer-motion/revealAnimation";
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
import { SparklesPreview } from "@/components/ui/Home Page/SparklesPreview";
import { WobbleCard } from "@/components/ui/wobble-card";
import HeroParallaxHome from "@/components/Home Page/HeroParallaxHome";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <SparklesPreview />
      <HeroParallaxHome />
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
      className="bg-black w-full py-12 md:py-16 lg:py-24 "
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
      bgColor: "pink-800",
      title: "Inventory Management",
      description: "Real-time tracking and optimization of medical supplies",
    },
    {
      icon: TruckIcon,
      title: "Supply Chain Visibility",
      bgColor: "indigo-800",
      description:
        "End-to-end visibility and control over your healthcare supply chain",
    },
    {
      icon: BarChart2Icon,
      title: "Demand Forecasting",
      bgColor: "blue-600",
      description: "AI-powered prediction for optimal stock levels",
    },
    {
      icon: Search,
      title: "Order Tracking",
      bgColor: "red-500",
      description: "Real-time updates on order status and location",
    },
    {
      icon: ShieldCheck,
      title: "Compliance Management",
      bgColor: "green-600",
      description: "Ensure adherence to healthcare regulations and standards",
    },
    {
      icon: Zap,
      title: "Automated Reordering",
      bgColor: "orange-500",
      description: "Smart reordering based on usage patterns and forecasts",
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Our Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <WobbleCard
              key={feature.title}
              containerClassName={`col-span-1 h-full transform  bg-${feature.bgColor} transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
              className="p-6"
            >
              <div className="max-w-xs">
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {feature.title}
                </h3>
                <p className="text-primary">{feature.description}</p>
              </div>
            </WobbleCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const PumpUpSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center ">
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
