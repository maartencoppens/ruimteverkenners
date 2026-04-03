import React from "react";

type ButtonProps = {
  label: string;
};

const Button = ({ label }: ButtonProps) => {
  return (
    <button className="bg-background-primary px-lg py-2xs w-fit rounded-md text-text-secondary">
      {label}
    </button>
  );
};

export default Button;
