import Image from "next/image";
import React from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import { Planet } from "../types/planet";

type RightInfoColumnProps = {
  planet: Planet | null;
};

const RightInfoColumn = ({ planet }: RightInfoColumnProps) => {
  return (
    <>
      <div className="h-full flex flex-col justify-between items-end overflow-hidden">
        <div>
          <div className="border-b border-border-primary p-4 w-full flex justify-end items-center gap-3.5">
            <h2 className="text-subtitle-primary text-end">Ster</h2>
            <Image src="/sun-blue.svg" alt="Sun" width={40} height={40} />
          </div>
          <div className="p-4 flex flex-col items-center w-full gap-xs">
            <h3 className="text-subtitle-secondary">Levenslijn</h3>
            <Card className="w-full">
              <div className="w-full flex flex-col items-center justify-between">
                <p className="text-body-primary">
                  {planet?.levensduurSter} miljard jaar
                </p>
                <Slider variant="primary" />
              </div>
            </Card>
            <div className="flex gap-sm w-full">
              <Card className="w-full">
                <p className="text-body-primary">Aantal planeten</p>
                <span className="text-2xs text-text-secondary">
                  {planet?.aantalPlanetenStelsel}
                </span>
              </Card>
              <Card className="w-full">
                <p className="text-body-primary">Temperatuur</p>
                <span className="text-2xs text-text-secondary">
                  {planet?.temperatuurSter} K
                </span>
              </Card>
            </div>
          </div>
        </div>
        <Image
          src="/info-button.svg"
          alt="Info buttons"
          width={50}
          height={50}
        />
      </div>
    </>
  );
};

export default RightInfoColumn;
