import type { HTMLAttributes, ReactNode } from 'react'

type BoxProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
}

const Box = ({ children, className = '', ...rest }: BoxProps) => {
  return (
    <div className={`${className}`} {...rest}>
      {children}
    </div>
  )
}

export default Box
