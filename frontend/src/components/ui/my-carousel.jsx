import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Example data for each carousel item
  const carouselData = [
    {
      title: "Inventory Overview",
      description: "See a summary of all items in stock.",
      icon: "📦",
    },
    {
      title: "Pending Requests",
      description: "Review and approve pending reservations.",
      icon: "⏳",
    },
    {
      title: "Checked Out",
      description: "Track items currently checked out.",
      icon: "🚚",
    },
    {
      title: "Low Stock Alerts",
      description: "Monitor items that need restocking.",
      icon: "⚠️",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions.",
      icon: "👤",
    },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full sm:max-w-[200px] md:min-w-[920px] lg:min-w-[1200px] h-full rounded-xl transition-all duration-300"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full h-full">
        {carouselData.map((item, index) => (
          <CarouselItem key={index} className="w-full h-full">
            <div className="p-1 w-full h-190 min-w-[100px] transition-all duration-300">
              <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full h-full bg-white min-w-[80px] transition-all duration-300">
                <CardContent className="flex flex-col items-center justify-center w-full h-full min-w-[60px] transition-all duration-300">
                  <span className="text-5xl mb-2">{item.icon}</span>
                  <span className="text-xl font-bold mb-1">{item.title}</span>
                  <span className="text-base text-gray-500 text-center">
                    {item.description}
                  </span>
                </CardContent>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
