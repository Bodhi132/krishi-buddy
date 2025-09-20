import React from 'react';
import Image from 'next/image';

interface ServiceIconProps {
  src: string;
  alt: string;
  size?: number;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ src, alt, size = 32 }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
    />
  );
};