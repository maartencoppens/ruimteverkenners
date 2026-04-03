import Image from "next/image";
import React from "react";
import { Planet } from "../types/planet";

type MiddleColumnProps = {
  planet: Planet | null;
};

const MiddleColumn = ({ planet }: MiddleColumnProps) => {
  return (
    <>
      <div className="h-full flex flex-col justify-between w-full relative overflow-hidden">
        <div className="flex flex-col items-center">
          <Image
            src="/around-sun.svg"
            alt="Orbit around sun"
            width={550}
            height={60}
            style={{ width: "auto", height: "auto" }}
          />
          <p className="text-text-primary text-body-primary text-sm m-0">
            {planet?.jaarTovAarde} dagen
          </p>
        </div>
        <Image
          src="/planet-placeholder.png"
          alt="Planet placeholder"
          width={550}
          height={550}
          className="mx-auto h-auto max-h-[52vh] w-auto"
          priority
        />
        <div>
          <div className="text-center">
            <h1 className="text-title-primary title-gradient">
              {planet?.planeetnaam}
            </h1>
            <h2 className="text-title-secondary title-gradient">
              Mogelijk Bewoonbaar
            </h2>
          </div>
          <div>
            <div className="flex items-center justify-center gap-md">
              <Image src="/earth.svg" alt="Earth icon" width={60} height={60} />

              <div className="flex flex-col items-center mt-2xl">
                <Image
                  src="/line-arrow.svg"
                  alt="Distance arrow"
                  width={200}
                  height={20}
                  className="w-full"
                  style={{ width: "auto", height: "auto" }}
                />

                <p className="text-text-primary text-body-primary text-sm m-0">
                  {planet?.afstandVanAarde} Lichtjaren
                </p>
              </div>
              <Image
                src="/planet.svg"
                alt="Earth icon"
                width={60}
                height={60}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiddleColumn;
