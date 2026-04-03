import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`bg-background-secondary py-2.5 px-7.5 w-fit rounded-lg border border-border-secondary rounded-2xs ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
