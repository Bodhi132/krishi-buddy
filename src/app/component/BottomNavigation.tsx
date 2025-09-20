import React from 'react';
import { Home, User, Search, Heart } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const BottomNavigation: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: <Home size={24} />, label: 'Home', active: true },
    { icon: <User size={24} />, label: 'Profile' },
    { icon: <Search size={24} />, label: 'Search' },
    { icon: <Heart size={24} />, label: 'Favorites' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-600 rounded-t-3xl px-6 py-4">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`p-2 rounded-full transition-colors ${
              item.active 
                ? 'bg-gray-400 text-gray-800' 
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={item.onClick}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};