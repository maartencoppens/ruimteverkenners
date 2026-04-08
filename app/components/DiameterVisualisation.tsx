import Image from "next/image";
import React from "react";

type DiameterVisualisationProps = {
  diameter?: number | string | null;
};

const DiameterVisualisation = ({ diameter }: DiameterVisualisationProps) => {
  const parsedDiameter =
    typeof diameter === "number"
      ? diameter
      : Number(String(diameter ?? "1").replace(",", "."));

  const safeDiameter =
    Number.isFinite(parsedDiameter) && parsedDiameter > 0 ? parsedDiameter : 1;

  const earthSize = 84;
  const basePlanetSize = 140;
  const planetSize = Math.min(basePlanetSize * safeDiameter, 260);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-65 w-65 items-center justify-center">
        <div
          className="rounded-full bg-[#6F6DD8]"
          style={{
            width: `${planetSize}px`,
            height: `${planetSize}px`,
          }}
        />
        <div className="absolute flex items-center justify-center">
          <Image
            src="/earth.svg"
            alt="Earth"
            width={earthSize}
            height={earthSize}
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <Image
          src={"/double-arrow.svg"}
          alt="Double arrow"
          width={planetSize}
          height={20}
        />
        <p className="text-center text-body-primary">{diameter} x de Aarde</p>
      </div>
    </div>
  );
};

export default DiameterVisualisation;
