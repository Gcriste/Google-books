import { ReactNode } from 'react';

type BoxProps = {
  children: ReactNode;
  className?: string; // Allows adding custom styles if needed
}

const Box = ({ children, className = "" }: BoxProps) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

export default Box;