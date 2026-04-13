import Image from "next/image";
import React from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { Planet } from "../types/planet";
import DiameterVisualisation from "../components/DiameterVisualisation";

type LeftColumnInfoProps = {
  planet: Planet | null;
  onShowExtraInfo: () => void;
  onSearchFurther?: () => void;
};

const LeftInfoColumn = ({
  planet,
  onShowExtraInfo,
  onSearchFurther,
}: LeftColumnInfoProps) => {
  return (
    <>
      <div className="h-full flex flex-col justify-between overflow-hidden">
        <div>
          <div className="border-b-4 border-border-quinary w-full flex items-center gap-3.5">
            <Image
              src="/planet-purple.svg"
              alt="Planet icon"
              width={40}
              height={40}
              className=""
            />
            <h2 className="text-subtitle-primary text-title font-bold uppercase">
              Planeet
            </h2>
          </div>
          <div className="p-4 flex flex-col items-center">
            <h3 className="text-subtitle-secondary font-subheading">Grootte</h3>
            <Card className="flex gap-xl">
              <DiameterVisualisation diameter={planet?.diameterPlaneet} />
              <div className="w-full flex items-center justify-center gap-3xs">
                <Image
                  src={"/weight-icon.svg"}
                  alt="Weight icon"
                  width={40}
                  height={40}
                />
                <p className="text-center text-body-primary">1,2 x aarde</p>
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-3xs">
            <div className="w-full">
              <h3 className="text-subtitle-secondary pl-15 font-subheading">
                Afstand van de ster
              </h3>
              <Slider
                variant="primary"
                mode="icon"
                value={planet?.afstandVanSter}
                min={0.005}
                max={100}
                scale="log"
                leftIcon="/fire.svg"
                markerIcon="/planet-purple-accent.svg"
                rightIcon="/ice.svg"
                leftLabel="DICHT"
                label={`${planet?.afstandVanSter} AE`}
                rightLabel="VER"
              />
            </div>
            <div className="w-full">
              <h3 className="text-subtitle-secondary pl-15 font-subheading">
                Zwaartekracht
              </h3>
              <Slider
                variant="secondary"
                mode="icon"
                value={planet?.gravitatiekracht}
                min={0}
                max={2}
                leftLabel="LAAG"
                leftIcon="/gravitatie-laag.svg"
                markerIcon="/planet-purple-accent.svg"
                label={`${planet?.gravitatiekracht} g`}
                rightLabel="HOOG"
                rightIcon="/gravitatie-hoog.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3xs">
          <Button label="?" rounded={true} onClick={onShowExtraInfo} />
          <Button label="Zoek verder" onClick={onSearchFurther} />
        </div>
      </div>
    </>
  );
};

export default LeftInfoColumn;
