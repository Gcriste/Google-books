import type { ReactNode, HTMLAttributes } from 'react'
import { useMemo } from 'react'

type FlexProps = {
  children: ReactNode
  direction?: 'row' | 'col'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
  wrap?: boolean
  gap?: string
  className?: string
  maxWidth?: string
  minHeight?: string
} & HTMLAttributes<HTMLDivElement>

const Flex = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
  gap = 'gap-4',
  className = '',
  maxWidth,
  minHeight,
  ...rest
}: FlexProps) => {
  const style = useMemo(() => ({ maxWidth, minHeight }), [maxWidth, minHeight])
  return (
    <div
      className={`${className} flex flex-${direction} items-${align} ${
        wrap ? 'flex-wrap' : ''
      } ${gap} justify-${justify}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Flex
