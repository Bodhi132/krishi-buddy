import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  variant?: 'default' | 'premium' | 'accent';
  disabled?: boolean;
  badge?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  onClick, 
  variant = 'default',
  disabled = false,
  badge
}) => {
  const baseClasses = "group relative rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center min-h-[110px] sm:min-h-[120px] transition-all duration-300 ease-out active:scale-95 select-none";
  
  const variantClasses = {
    default: `
      bg-gradient-to-br from-[#FAFAF9] to-[#f5f5f0] 
      hover:from-[#f5f5f0] hover:to-[#EBEBE6] 
      active:from-[#EBEBE6] active:to-[#e6e6e1]
      border border-[#EBEBE6] 
      hover:border-[#d6d6d1] 
      shadow-sm hover:shadow-md 
      hover:shadow-[#465A54]/5
      sm:hover:-translate-y-0.5
    `,
    premium: `
      bg-gradient-to-br from-[#465A54] to-[#3a4b45] 
      hover:from-[#3a4b45] hover:to-[#2f3c37]
      active:from-[#2f3c37] active:to-[#243029]
      border border-[#465A54] 
      hover:border-[#3a4b45]
      shadow-md hover:shadow-lg 
      hover:shadow-[#465A54]/20
      sm:hover:-translate-y-0.5
    `,
    accent: `
      bg-gradient-to-br from-[#FAFAF9] via-[#EBEBE6] to-[#d6d6d1]
      hover:from-[#EBEBE6] hover:via-[#d6d6d1] hover:to-[#c7c7c2]
      active:from-[#d6d6d1] active:to-[#c7c7c2]
      border-2 border-[#465A54]
      hover:border-[#3a4b45]
      shadow-md hover:shadow-lg 
      hover:shadow-[#465A54]/15
      sm:hover:-translate-y-0.5
    `
  };

  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none grayscale";
  const enabledClasses = "cursor-pointer touch-manipulation";

  const iconColorClasses = {
    default: "text-[#465A54] group-hover:text-[#3a4b45] group-active:text-[#2f3c37]",
    premium: "text-[#FAFAF9] group-hover:text-[#EBEBE6]",
    accent: "text-[#465A54] group-hover:text-[#3a4b45] group-active:text-[#2f3c37]"
  };

  const textColorClasses = {
    default: "text-[#465A54] group-hover:text-[#3a4b45] group-active:text-[#2f3c37]",
    premium: "text-[#FAFAF9] group-hover:text-[#EBEBE6]",
    accent: "text-[#465A54] group-hover:text-[#3a4b45] group-active:text-[#2f3c37]"
  };

  const badgeClasses = {
    default: "bg-[#465A54] text-[#FAFAF9]",
    premium: "bg-[#FAFAF9] text-[#465A54]",
    accent: "bg-[#465A54] text-[#FAFAF9]"
  };

  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${disabled ? disabledClasses : enabledClasses}
      `}
      onClick={disabled ? undefined : onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={onClick && !disabled ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {/* Badge - optimized for mobile visibility */}
      {badge && (
        <div className={`
          absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 
          ${badgeClasses[variant]} 
          text-xs sm:text-sm px-2 py-1 rounded-full font-semibold 
          shadow-sm border-2 border-[#FAFAF9] z-10
          min-w-[20px] text-center
        `}>
          {badge}
        </div>
      )}
      
      {/* Icon container - mobile optimized sizing */}
      <div className={`
        mb-2.5 sm:mb-3 transform transition-all duration-300 
        group-active:scale-95 sm:group-hover:scale-110
        ${iconColorClasses[variant]}
      `}>
        <div className="text-xl sm:text-2xl flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
          {icon}
        </div>
      </div>
      
      {/* Title - mobile-first typography */}
      <span className={`
        text-xs sm:text-sm text-center font-semibold leading-tight 
        max-w-full px-1 sm:px-2 transition-colors duration-200
        ${textColorClasses[variant]}
        line-clamp-2 break-words
      `}>
        {title}
      </span>
      
      {/* Mobile-optimized touch feedback */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#465A54] to-transparent opacity-0 group-active:opacity-5 sm:group-hover:opacity-3 transition-opacity duration-200 pointer-events-none" />
      
      {/* Subtle inner glow for depth */}
      <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};