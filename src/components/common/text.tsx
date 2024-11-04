
import React from 'react';

interface TextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption';
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode;
  className?: string; 
}

const Text: React.FC<TextProps> = ({
  variant = 'body',
  size = 'medium',
  children,
  className = '',
}) => {
  const baseStyles = `${className}`;

  const variantStyles = {
    heading: 'font-bold text-gray-800',
    subheading: 'font-semibold text-gray-700',
    body: 'text-gray-600',
    caption: 'text-gray-500 text-sm',
  };

  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl',
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