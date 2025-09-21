"use client"
import React, { useMemo, useCallback } from 'react';
import { HeroBanner } from './component/HeroBanner';
import { ServiceCard } from './component/ServiceCard';
import { BottomNavigation } from './component/BottomNavigation';
import { ServiceIcon } from './component/ServiceIcon';
import { useRouter } from 'next/navigation';

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  targetText: string;
  backgroundImage: string;
}

interface Service {
  iconSrc: string;
  iconAlt: string;
  title: string;
  link: string;
  category?: 'farming' | 'guidance' | 'market' | 'support';

  variant?: 'default' | 'premium' | 'accent';
}

const HomePage: React.FC = () => {
  const router = useRouter();

  // Memoized banner data for performance
  const bannerData: BannerData[] = useMemo(() => [
    {
      id: 1,
      title: "CENTRAL GOVERNMENT",
      subtitle: "Launches",
      description: "THREE NEW TRANSFORMATIVE",
      targetText: "SCHEMES FOR FARMERS",
      backgroundImage: "/banner/img1.jpg"
    },
    {
      id: 2,
      title: "MINISTRY OF AGRICULTURE",
      subtitle: "Announces",
      description: "DIGITAL FARMING",
      targetText: "INITIATIVE 2024",
      backgroundImage: "/banner/img2.webp"
    },
    {
      id: 3,
      title: "PM KISAN SCHEME",
      subtitle: "Introduces",
      description: "ENHANCED BENEFITS",
      targetText: "FOR RURAL FARMERS",
      backgroundImage: "/banner/img3.webp"
    }
  ], []);

  // Enhanced services with categories and variants
  const services: Service[] = useMemo(() => [
    {
      iconSrc: '/icons/homepage/img1.svg',
      iconAlt: 'Soil Care',
      title: 'Soil Care\nRecommendation',
      link: 'Soil-Care-Recommendation',
      category: 'farming',
      variant: 'accent'
    },
    {
      iconSrc: '/icons/homepage/img2.svg',
      iconAlt: 'Fertilizer',
      title: 'Fertilizer Guidance',
      link: 'Fertilizer-Guidance',
      category: 'guidance',
      variant: 'default'
    },
    {
      iconSrc: '/icons/homepage/img3.svg',
      iconAlt: 'Pest Detection',
      title: 'Pest Detection',
      link: 'Pest-detection',
      category: 'farming',
      variant: 'premium'
    },
    {
      iconSrc: '/icons/homepage/img4.svg',
      iconAlt: 'Pest Advisories',
      title: 'Pest Advisories',
      link: "Pest-Advisories",
      category: 'guidance',
      variant: 'default'
    },
    {
      iconSrc: '/icons/homepage/img5.svg',
      iconAlt: 'Video Guides',
      title: 'Farmer Dashboard',
      link: 'Farmer-dashboard',
      category: 'guidance',
      variant: 'accent'
    },
    {
      iconSrc: '/icons/homepage/img6.svg',
      iconAlt: 'Market Updates',
      title: 'Market Updates',
      link: 'Market-Updates',
      category: 'market',
      variant: 'premium'
    },
    {
      iconSrc: '/icons/homepage/img7.svg',
      iconAlt: 'Contact Us',
      title: 'Contact Us',
      link: 'Contact-Us',
      category: 'support',
      variant: 'default'
    },
  ], []);

  // Optimized navigation handler
  const handleServiceClick = useCallback((link: string, title: string) => {
    // Add analytics or tracking here if needed
    console.log(`Navigating to ${title}`);
    router.push(`/${link}`);
  }, [router]);

  // Group services by category for better organization
  const servicesByCategory = useMemo(() => {
    return services.reduce((acc, service) => {
      const category = service.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {} as Record<string, Service[]>);
  }, [services]);

  const categoryTitles = {
    farming: 'Farming Solutions',
    guidance: 'Expert Guidance',
    market: 'Market Intelligence',
    support: 'Support & Help'
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-20">
      {/* Hero Banner Carousel */}
      <section className="relative" aria-label="Featured announcements">
        <HeroBanner banners={bannerData} />
      </section>

      {/* Services Section */}
      <main className="px-4 py-6 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#465A54]">
            Our Services
          </h2>
          <p className="text-sm sm:text-base text-[#465A54]/70 max-w-md mx-auto">
            Comprehensive agricultural solutions at your fingertips
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#465A54] to-[#465A54]/50 mx-auto rounded-full"></div>
        </div>

        {/* All Services Grid - Mobile Optimized */}
        <section aria-label="Available services">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={`${service.link}-${index}`}
                icon={
                  <ServiceIcon
                    src={service.iconSrc}
                    alt={service.iconAlt}
                    size={28}
                    // className="w-7 h-7 sm:w-8 sm:h-8"
                  />
                }
                title={service.title}
                variant={service.variant}
                onClick={() => handleServiceClick(service.link, service.title)}
              />
            ))}
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="grid grid-cols-3 gap-4" aria-label="Platform statistics">
          <div className="bg-white rounded-xl p-4 text-center border border-[#EBEBE6] shadow-sm">
            <div className="text-2xl font-bold text-[#465A54]">10K+</div>
            <div className="text-xs text-[#465A54]/70">Active Farmers</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-[#EBEBE6] shadow-sm">
            <div className="text-2xl font-bold text-[#465A54]">50+</div>
            <div className="text-xs text-[#465A54]/70">Expert Guides</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-[#EBEBE6] shadow-sm">
            <div className="text-2xl font-bold text-[#465A54]">24/7</div>
            <div className="text-xs text-[#465A54]/70">Support</div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default HomePage;