import Image from "next/image";
import React, { Suspense } from "react";
import { Planet } from "../types/planet";
import PlanetHero from "../components/PlanetHero";
import { Canvas } from "@react-three/fiber";

type MiddleColumnProps = {
  planet: Planet | null;
  currentScreen: "info" | "flag-form" | "extra-info";
  onBack: () => void;
  hideContent?: boolean;
};

const MiddleColumn = ({
  planet,
  currentScreen,
  onBack,
  hideContent,
}: MiddleColumnProps) => {
  const hiddenContentClass = hideContent
    ? "opacity-0 pointer-events-none"
    : "opacity-100";
  const canvasWidthClass =
    currentScreen === "info" ? "max-w-full" : "max-w-[calc(100%-5rem)]";

  return (
    <>
      <div className="h-full min-w-0 flex flex-col justify-between w-full relative overflow-hidden">
        {currentScreen === "extra-info" && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Terug"
            className={`absolute right-0 top-1/2 -translate-y-1/2 text-6xl leading-none text-white z-10 transition-opacity duration-300 ${hiddenContentClass}`}
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
            className={`absolute left-0 top-1/2 -translate-y-1/2 text-6xl leading-none text-white z-10 transition-opacity duration-300 ${hiddenContentClass}`}
          >
            <Image
              src="/left-arrow-button.svg"
              alt="Close icon"
              width={30}
              height={30}
            />
          </button>
        )}

        <div
          className={`flex flex-col items-center transition-opacity duration-300 ${hiddenContentClass}`}
        >
          <Image
            src="/around-sun.svg"
            alt="Orbit around sun"
            width={550}
            height={60}
            className="max-w-full h-auto"
          />
          <p className="text-text-primary text-body-primary text-sm m-0">
            {planet?.jaarTovAarde} dagen
          </p>
        </div>
        <div
          className={`relative mx-auto flex aspect-square w-[min(38vw,58dvh,42rem)] items-center justify-center ${canvasWidthClass}`}
        >
          <Canvas
            className="relative z-10 w-full h-full touch-none"
            camera={{ position: [0, 0, 2.6] }}
          >
            <ambientLight intensity={1.4} />
            <directionalLight position={[4, 5, 4]} intensity={2.4} />
            <directionalLight position={[-3, -2, -4]} intensity={0.8} />
            <Suspense fallback={null}>
              <PlanetHero planetID={planet?.id} />
            </Suspense>
          </Canvas>
          {/* <Image
            src="/planet-placeholder.png"
            alt="Planet placeholder"
            fill
            className="mx-auto w-full h-auto"
            priority
          /> */}
        </div>
        <div
          className={`min-w-0 transition-opacity duration-300 ${hiddenContentClass}`}
        >
          <div className="text-center min-w-0">
            <h1 className="font-heading text-title-primary title-gradient uppercase leading-20">
              {planet?.planeetnaam}
            </h1>
            <h2 className="font-heading text-title-secondary text-title">
              Mogelijk Bewoonbaar
            </h2>
          </div>
          <div>
            <div className="w-full flex items-center justify-between gap-md">
              <Image src="/earth.svg" alt="Earth icon" width={60} height={60} />

              <div className="flex-1 min-w-0 flex flex-col items-center mt-2xl">
                <Image
                  src="/line-arrow.svg"
                  alt="Distance arrow"
                  width={400}
                  height={24}
                  className="w-full h-auto"
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
