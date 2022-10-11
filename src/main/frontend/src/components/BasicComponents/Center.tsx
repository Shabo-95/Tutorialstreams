import React, { FC } from "react";

interface CenterProps {
  children: any;
}

export const Center: FC<CenterProps> = ({ children }) => {
  return (
    <div className="flex align-items-center justify-content-center">
      {children}
    </div>
  );
};
