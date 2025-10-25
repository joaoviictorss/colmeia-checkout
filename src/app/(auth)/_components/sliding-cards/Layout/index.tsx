"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import type { ISlidingCardsData, SlidingCardData } from "../data";

export const SlidingCards = ({ data, getIcon }: ISlidingCardsData) => {
  const speed = 3000;

  return (
    <div className="w-7/12 p-4">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-brand-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_60%)]" />

        <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/5 to-brand-primary/80" />

        <div className="h-full w-full">
          <Swiper
            allowTouchMove={true}
            autoplay={{
              delay: speed,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            className="h-full w-full"
            direction="vertical"
            loop={true}
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={24}
            watchSlidesProgress={true}
          >
            {data.map((card: SlidingCardData) => (
              <SwiperSlide key={card.id}>
                <div className="flex h-full w-full items-center justify-center p-6">
                  <div className="group relative flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border-2 border-brand-primary/20 bg-white p-6 text-center shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="mb-4 flex h-48 justify-center">
                      {card.icon && (
                        <div className="inline-block h-full w-full">
                          {getIcon(card.icon)}
                        </div>
                      )}
                    </div>

                    <h3 className="mb-4 font-bold text-brand-primary text-xl tracking-tight">
                      {card.title}
                    </h3>

                    {card.description && (
                      <p className="mb-4 text-gray-600 text-sm">
                        {card.description}
                      </p>
                    )}

                    {card.buttonText && (
                      <div className="mt-auto">
                        <Button
                          aria-label={`Saiba mais sobre ${card.title}`}
                          className={"w-full cursor-default rounded-full"}
                          size={"lg"}
                          variant={"outline"}
                        >
                          {card.buttonText}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
