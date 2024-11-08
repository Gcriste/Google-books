import React, { FC, PropsWithChildren } from "react";
import Text from "./text";
import Flex from "./flex";

type ContainerProps = PropsWithChildren & {
  title: string;
  subtitle?: string;
};

const Container: FC<ContainerProps> = ({ title, subtitle, children }) => {
  return (
    <Flex
      direction="col"
      gap="gap-8"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      <Text variant="heading" size="xLarge">
        {title}
      </Text>
      {subtitle && <Text variant="subheading" size="large">{subtitle}</Text>}
      {children}
    </Flex>
  );
};

export default Container;
