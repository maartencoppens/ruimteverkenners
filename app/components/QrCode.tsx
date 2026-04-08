import React from "react";

type QrCodeProps = {
  className?: string;
};

const QrCode = ({ className }: QrCodeProps) => {
  return (
    <div className={`w-40 h-40 bg-background-primary ${className}`}>QrCode</div>
  );
};

export default QrCode;
