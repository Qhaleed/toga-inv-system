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

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full sm:max-w-[200px] md:min-w-[920 px] lg:min-w-[1200px] h-full rounded-xl transition-all duration-300"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full h-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="w-full h-full">
            <div className="p-1 w-full h-190 min-w-[100px] transition-all duration-300">
              <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full h-full bg-white min-w-[80px] transition-all duration-300">
                <CardContent className="flex items-center justify-center w-full h-full min-w-[60px] transition-all duration-300">
                  <span className="text-4xl font-semibold">{index + 1}</span>
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
