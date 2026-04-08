import Image from "next/image";
import React from "react";
import { Planet } from "../types/planet";

type MiddleColumnProps = {
  planet: Planet | null;
  currentScreen: "info" | "flag-form" | "extra-info";
  onBack: () => void;
};

const MiddleColumn = ({ planet, currentScreen, onBack }: MiddleColumnProps) => {
  return (
    <>
      <div className="h-full flex flex-col justify-between w-full relative overflow-hidden">
        {currentScreen === "extra-info" && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Terug"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-6xl leading-none text-white z-10"
          >
            <Image
              src="/right-arrow-button.svg"
              alt="Close icon"
              width={30}
              height={30}
            />
          </button>
        )}

        {currentScreen === "flag-form" && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Terug"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-6xl leading-none text-white z-10"
          >
            <Image
              src="/left-arrow-button.svg"
              alt="Close icon"
              width={30}
              height={30}
            />
          </button>
        )}

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
        {/* <div className="w-full aspect-square relative flex items-center justify-center"> */}
        <Image
          src="/planet-placeholder.png"
          alt="Planet placeholder"
          width={550}
          height={550}
          className="mx-auto"
          priority
        />
        {/* </div> */}
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
