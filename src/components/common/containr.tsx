import React, { FC, PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren & {
  title: string;
  subtitle?: string;
};

const Container: FC<ContainerProps> = ({ title, subtitle, children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h1>
      {subtitle && <h2 className="text-lg text-gray-600 mb-4">{subtitle}</h2>}
      {children}
    </div>
  );
};

export default Container;
