"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  targetText: string;
  backgroundImage?: string;
}

interface HeroBannerProps {
  banners: BannerItem[];
  interval?: number; // allow custom interval
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  banners,
  interval = 5000, // default 5s
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer); // cleanup
  }, [interval, banners.length]);

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative mx-4 mt-4 mb-6">
      <div
        className="relative rounded-2xl p-6 text-white overflow-hidden min-h-[200px]"
        style={{
          background: currentBanner.backgroundImage
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentBanner.backgroundImage})`
            : "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #15803d 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-all"
          aria-label="Previous banner"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-all"
          aria-label="Next banner"
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        {/* Banner Content */}
        <div className="relative z-10">
          <h1 className="text-lg font-bold mb-1">{currentBanner.title}</h1>
          <h2 className="text-sm italic mb-3">{currentBanner.subtitle}</h2>

          <div className="bg-yellow-400 text-black px-3 py-2 rounded-lg inline-block mb-2">
            <div className="text-xs font-bold">{currentBanner.description}</div>
            <div className="text-xs font-medium">{currentBanner.targetText}</div>
          </div>
        </div>

        {/* Decorative farmer illustration placeholder */}
        <div className="absolute bottom-4 right-4 w-16 h-16 bg-green-600 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};
