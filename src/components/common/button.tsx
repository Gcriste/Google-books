import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void; // Function to handle click events
  children: React.ReactNode; // Content to be displayed inside the button
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'; // Define button variants
  size?: 'small' | 'medium' | 'large'; // Define button sizes
  disabled?: boolean; // Disable the button if true
  className?: string; // Allows for additional styling
}

const Button = ({
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  ...rest
} : ButtonProps) => {
  // Define base button styles
  const baseStyles = 'rounded focus:outline-none transition duration-200';

  // Define variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-500',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-500',
  };

  // Define size styles
  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;