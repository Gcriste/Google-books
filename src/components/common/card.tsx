import React, { FC } from "react";
import Link from "next/link";

type OwnProps = {
  id: string;
  link: string;
  children: React.ReactNode;
};

const Card: FC<OwnProps> = ({ id, link, children }) => {
  return (
    <Link id={id} href={link}>
      <div className=" rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
        {children}
      </div>
    </Link>
  );
};

export default Card;
