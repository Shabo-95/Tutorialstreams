import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../BasicComponents/CustomButton";

export const Error = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <h1 className="text-center">404</h1>
      <h2 className="text-center">Seite nicht gefunden</h2>
      <CustomButton
        label="Zurück zur Startseite"
        type="button"
        onClick={handleClick}
      />
    </>
  );
};
