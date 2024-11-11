import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'small' | 'medium' | 'large' | 'none'
  disabled?: boolean
  className?: string
  pointerOnHover?: boolean
}

const Button = ({
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  pointerOnHover = false,
  ...rest
}: ButtonProps) => {
  const baseStyles = 'rounded focus:outline-none transition duration-200'
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const cursorStyle = pointerOnHover && !disabled ? 'cursor-pointer' : ''

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-blue-500',
    secondary: 'bg-secondary text-white hover:bg-blue-800',
    outline: disabled
      ? 'border border-primary text-primary'
      : 'border border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'bg-danger text-white hover:bg-red-500',
    ghost: 'border-none '
  }

  const sizeStyles = {
    none: '',
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${cursorStyle} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
