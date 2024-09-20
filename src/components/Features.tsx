import React from "react";
import { TruckIcon, HeadphonesIcon, ShieldCheckIcon } from "lucide-react";

type FeatureIconType = "TruckIcon" | "HeadphonesIcon" | "ShieldCheckIcon";

interface FeatureProps {
  icon: FeatureIconType;
  title: string;
  description: string;
}

const iconComponents = {
  TruckIcon,
  HeadphonesIcon,
  ShieldCheckIcon,
};

function Feature({ icon, title, description }: FeatureProps) {
  const IconComponent = iconComponents[icon];

  return (
    <div className="flex flex-col items-center text-center p-4 transition-all duration-300 hover:transform hover:scale-105">
      <div className="mb-4 p-3 bg-primary text-primary-foreground rounded-full shadow-lg">
        <IconComponent size={24} aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-lg font-semibold uppercase">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Features() {
  const features: FeatureProps[] = [
    {
      icon: "TruckIcon",
      title: "Fast and free delivery",
      description: "Free delivery for orders over $140",
    },
    {
      icon: "HeadphonesIcon",
      title: "24/7 Customer Support",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "ShieldCheckIcon",
      title: "Money back guarantee",
      description: "We return money within 30 days",
    },
  ];

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="sr-only">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
