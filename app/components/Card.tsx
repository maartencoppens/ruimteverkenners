import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
};

const Card = ({ children, className, noPadding = false }: CardProps) => {
  return (
    <div
      className={`bg-background-secondary w-fit rounded-xl border-2 border-border-secondary rounded-2xs ${noPadding ? "" : "py-2.5 px-7.5"} ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
