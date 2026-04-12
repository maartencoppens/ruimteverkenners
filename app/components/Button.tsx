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
      className={`bg-background-primary text-text-secondary flex items-center justify-center gap-2xs ${rounded ? "h-16 w-16 shrink-0 rounded-full p-0" : "w-fit rounded-md px-lg py-2xs"}`}
    >
      {label}
      {icon && <Image src={icon} alt="" width={20} height={20} />}
      {children}
    </button>
  );
};

export default Button;
