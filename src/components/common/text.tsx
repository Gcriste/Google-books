type TextProps = {
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'error'
  size?: 'small' | 'medium' | 'large' | 'xLarge'
  children: React.ReactNode
  className?: string
}

const Text: React.FC<TextProps> = ({
  variant = 'body',
  size = 'medium',
  children,
  className = ''
}) => {
  const baseStyles = `${className}`

  const variantStyles = {
    heading: 'font-semibold text-gray-800',
    subheading: 'font-semibold text-gray-700',
    body: 'text-gray-600',
    caption: 'text-gray-500 text-sm',
    error: 'text-danger'
  }

  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl',
    xLarge: 'text-2xl'
  }

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Text
