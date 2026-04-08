import Image from "next/image";
import React from "react";

type ButtonProps = {
  label?: string;
  icon?: string;
  rounded?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button = ({
  label,
  icon,
  rounded,
  onClick,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-background-primary px-lg py-2xs w-fit text-text-secondary flex items-center gap-2xs ${rounded ? "rounded-full" : "rounded-md"}`}
    >
      {label}
      {icon && <Image src={icon} alt="" width={20} height={20} />}
      {children}
    </button>
  );
};

export default Button;
