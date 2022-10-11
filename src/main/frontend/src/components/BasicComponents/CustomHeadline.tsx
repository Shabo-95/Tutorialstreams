import React, { FC } from "react";

interface CustomHeadlineProps {
  children: string;
}

export const CustomHeadline: FC<CustomHeadlineProps> = ({ children }) => {
  return <h1 className="m-0 p-5 text-center">{children}</h1>;
};
