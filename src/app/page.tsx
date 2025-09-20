"use client"
import React from 'react';
import { HeroBanner } from './component/HeroBanner';
import { ServiceCard } from './component/ServiceCard';
import { BottomNavigation } from './component/BottomNavigation';
import { ServiceIcon } from './component/ServiceIcon';
import { useRouter } from 'next/navigation';
import { link } from 'fs';

const HomePage: React.FC = () => {

  const router = useRouter()

  const bannerData = [
    {
      id: 1,
      title: "CENTRAL GOVERNMENT",
      subtitle: "Launches",
      description: "THREE NEW TRANSFORMATIVE",
      targetText: "SCHEMES FOR FARMERS",
      backgroundImage: "/images/banner1.jpg" // Add your banner image here
    },
    {
      id: 2,
      title: "MINISTRY OF AGRICULTURE",
      subtitle: "Announces",
      description: "DIGITAL FARMING",
      targetText: "INITIATIVE 2024",
      backgroundImage: "/images/banner2.jpg" // Add your banner image here
    },
    {
      id: 3,
      title: "PM KISAN SCHEME",
      subtitle: "Introduces",
      description: "ENHANCED BENEFITS",
      targetText: "FOR RURAL FARMERS",
      backgroundImage: "/images/banner3.jpg" // Add your banner image here
    }
  ];

  const services = [
    {
      iconSrc: '/icons/homepage/img1.svg',
      iconAlt: 'Soil Care',
      title: 'Soil Care\nRecommendation',
      link:'Soil-Care-Recommendation'
    },
    {
      iconSrc: '/icons/homepage/img2.svg',
      iconAlt: 'Fertilizer',
      title: 'Fertilizer Guidance',
      link:'Fertilizer-Guidance'
    },
    {
      iconSrc: '/icons/homepage/img3.svg',
      iconAlt: 'Pest Detection',
      title: 'Pest detection',
      link:'Pest-detection'
    },
    {
      iconSrc: '/icons/homepage/img4.svg',
      iconAlt: 'Pest Advisories',
      title: 'Pest Advisories',
      link:"Pest-Advisories" 
    },
    {
      iconSrc: '/icons/homepage/img5.svg',
      iconAlt: 'Video Guides',
      title: 'Video Guides',
      link: 'video-guides'
    },
    {
      iconSrc: '/icons/homepage/img6.svg',
      iconAlt: 'Market Updates',
      title: 'Market Updates',
      link:'Market-Updates'
    },
    {
      iconSrc: '/icons/homepage/img7.svg',
      iconAlt: 'Contact Us',
      title: 'Contact Us',
      link:'Contact-Us'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner Carousel */}
      <HeroBanner banners={bannerData} />

      {/* Services Grid */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={
                <ServiceIcon
                  src={service.iconSrc}
                  alt={service.iconAlt}
                  size={32}
                />
              }
              title={service.title}
              // onClick={() => console.log(`Clicked on ${service.title}`)}
              onClick={() => router.push(`/${service.link}`)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default HomePage;