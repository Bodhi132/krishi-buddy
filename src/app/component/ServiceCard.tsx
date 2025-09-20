import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[100px] cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="mb-2 text-gray-700">
        {icon}
      </div>
      <span className="text-xs text-center text-gray-800 font-medium leading-tight">
        {title}
      </span>
    </div>
  );
};
