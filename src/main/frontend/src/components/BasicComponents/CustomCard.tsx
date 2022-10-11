import { Card } from "primereact/card";
import React, { FC } from "react";

interface CustomCardProps {
  children: any;
}

export const CustomCard: FC<CustomCardProps> = ({ children }) => {
  return (
    <div className="mt-8 flex flex-column align-items-center justify-content-center">
      <Card className="border-round-3xl">{children}</Card>
    </div>
  );
};
