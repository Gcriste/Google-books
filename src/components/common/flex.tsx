import { ReactNode } from 'react';

type FlexProps = {
  children: ReactNode;
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
  gap?: string; // Tailwind gap classes like "gap-4"
  className?: string;
}

const Flex = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
  gap = 'gap-4',
  className = '',
}: FlexProps) => {
  return (
    <div
      className={`flex flex-${direction} items-${align} justify-${justify} ${
        wrap ? 'flex-wrap' : ''
      } ${gap} ${className}`}
    >
      {children}
    </div>
  );
};

export default Flex;