import { InputText } from "primereact/inputtext";
import React, { FC } from "react";
import { Center } from "./Center";

interface CustomInputTextProps {
  name: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  children: string;
}

export const CustomInputText: FC<CustomInputTextProps> = ({
  name,
  id,
  value,
  onChange,
  children,
}) => {
  return (
    <div className="p-5">
      <Center>
        <span className="p-float-label">
          <InputText
            className="w-15rem"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
          />
          <label htmlFor={name}>{children}</label>
        </span>
      </Center>
    </div>
  );
};
