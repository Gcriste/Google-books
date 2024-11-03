
import React from 'react';

interface TextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption'; // Text variants
  size?: 'small' | 'medium' | 'large'; // Text sizes
  children: React.ReactNode; // Content to be displayed
  className?: string; // Additional classes for custom styling
}

const Text: React.FC<TextProps> = ({
  variant = 'body',
  size = 'medium',
  children,
  className = '',
}) => {
  // Define base text styles
  const baseStyles = `${className}`;

  // Define variant styles
  const variantStyles = {
    heading: 'font-bold text-gray-800',
    subheading: 'font-semibold text-gray-700',
    body: 'text-gray-600',
    caption: 'text-gray-500 text-sm',
  };

  // Define size styles
  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
};

export default Text;