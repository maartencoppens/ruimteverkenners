import Image from "next/image";
import React from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import { Planet } from "../types/planet";
import Button from "../components/Button";

type RightInfoColumnProps = {
  planet: Planet | null;
  onShowFlagForm: () => void;
};

const RightInfoColumn = ({ planet, onShowFlagForm }: RightInfoColumnProps) => {
  return (
    <>
      <div className="h-full flex flex-col justify-between items-end overflow-hidden">
        <div>
          <div className="border-b-4 border-border-quinary p-4 w-full flex justify-end items-center gap-3.5">
            <h2 className="text-subtitle-primary text-end font-bold text-title">
              Ster
            </h2>
            <Image src="/sun-purple.svg" alt="Sun" width={40} height={40} />
          </div>
          <div className="p-4 flex flex-col items-center w-full gap-xs">
            <h3 className="text-subtitle-secondary">Levenslijn</h3>
            <Card className="w-full">
              <div className="w-full flex flex-col items-center justify-between">
                <Slider
                  variant="primary"
                  mode="arrow"
                  value={planet?.levensduurSter}
                  min={0}
                  max={160}
                  label={
                    planet?.levensduurSter
                      ? `${planet.levensduurSter} miljard jaar`
                      : undefined
                  }
                  leftLabel="0"
                  rightLabel="160"
                />
              </div>
            </Card>
            <div className="flex gap-sm w-full">
              <Card className="w-full">
                <p className="text-body-primary">Aantal planeten</p>
                <div className="flex gap-1">
                  <span className="text-2xs text-text-secondary">
                    {planet?.aantalPlanetenStelsel}
                  </span>
                  <Image
                    src="/planet-blue.svg"
                    alt="Planets"
                    width={15}
                    height={15}
                  />
                </div>
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
        <Button
          label="Plant je vlag"
          icon="/flag.svg"
          onClick={onShowFlagForm}
        />
      </div>
    </>
  );
};

export default RightInfoColumn;
