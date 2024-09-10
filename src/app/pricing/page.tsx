import RevealAnimation from "@/components/framer-motion/revealAnimation";
import { SiteHeader2 } from "@/components/SiteHeader2";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function PricingPage() {
  const tiers = [
    {
      name: "Basic",
      price: "$499",
      description: "Essential features for small pharmacies",
      features: [
        "Real-time inventory tracking",
        "Blockchain-based transaction storage",
        "Batch tracking and recall management",
        "Payment processing integration",
        "Basic analytics",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$999",
      description: "Advanced features for growing businesses",
      features: [
        "All Basic features",
        "Advanced analytics",
        "Detailed demand analysis",
        "API access for custom integrations",
        "Priority email support",
      ],
      cta: "Get Started",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-scale solution for large organizations",
      features: [
        "All Pro features",
        "Full analytics dashboards",
        "Customized reporting options",
        "24/7 priority support",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader2 />
      <div className="min-h-screen bg-muted/40">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
          <p className="text-xl text-center mb-12">
            Choose the perfect plan for your pharmaceutical supply chain needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <RevealAnimation key={tier.name}>
                <Card
                  key={tier.name}
                  className={`flex flex-col ${index === 1 ? " border-2" : ""}`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      {tier.name}
                    </CardTitle>
                    <CardDescription className="">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-4xl font-bold mb-6">{tier.price}</p>
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{tier.cta}</Button>
                  </CardFooter>
                </Card>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
