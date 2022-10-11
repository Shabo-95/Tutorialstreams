import React, { FC } from "react";
import { Button } from "primereact/button";
import { Center } from "./Center";

interface CustomButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CustomButton: FC<CustomButtonProps> = ({
  label,
  type,
  onClick,
}) => {
  return (
    <div className="p-5">
      <Center>
        <Button
          className="w-12rem"
          label={label}
          type={type}
          onClick={onClick}
        />
      </Center>
    </div>
  );
};
