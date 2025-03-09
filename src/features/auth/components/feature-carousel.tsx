"use client";

import Image from "next/image";
import * as React from "react";

import type { CarouselApi } from "@/components/ui/carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { features } from "@/features/auth/config";
import { cn } from "@/lib/utils";

export function FeatureCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="z-10 w-full max-w-[472px]"
    >
      <CarouselContent className="mb-12">
        {features.map(({ id, name, description, image }) => (
          <CarouselItem key={id}>
            <div>
              <Image
                src={image}
                alt={name}
                width={472}
                height={300}
                className="mb-12 h-full w-full"
              />
              <div className="text-center">
                <h2 className="mb-2 text-xl font-medium text-white dark:text-gray-50">
                  {name}
                </h2>
                <p className="text-brand-200 font-medium dark:text-gray-400">
                  {description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="relative">
        <CarouselPrevious className="left-14" />
        <div className="flex items-center justify-center gap-x-4 text-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "bg-brand-500 size-2.5 rounded-full dark:bg-gray-500",
                current === index + 1 && "bg-white dark:bg-gray-300",
              )}
            />
          ))}
        </div>
        <CarouselNext className="right-14" />
      </div>
    </Carousel>
  );
}
