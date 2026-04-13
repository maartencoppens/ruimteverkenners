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
      <div className="h-full w-full min-w-0 flex flex-col justify-between overflow-hidden">
        <div className="w-full min-w-0 flex flex-col gap-xl">
          <div className="border-b-4 border-border-quinary w-full flex justify-end items-center gap-3.5">
            <h2 className="text-subtitle-primary text-end font-bold text-title uppercase">
              Ster
            </h2>
            <Image src="/sun-purple.svg" alt="Sun" width={40} height={40} />
          </div>
          <div className="flex flex-col items-center w-full">
            <h3 className="text-subtitle-secondary font-subheading">
              Levenslijn
            </h3>
            <div className="flex flex-col gap-xs w-full">
              <Card className="w-full min-w-0 max-w-full">
                <div className="w-full min-w-0 flex flex-col items-center justify-between">
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
              <div className="flex gap-3xs w-full min-w-0">
                <Card className="w-full min-w-0 max-w-full">
                  <p className="text-body-primary min-w-0">Aantal planeten</p>
                  <div className="flex min-w-0 gap-1">
                    <span className="text-2xs text-body-primary text-text-secondary">
                      {planet?.aantalPlanetenStelsel}
                    </span>
                    <Image
                      src="/planet.svg"
                      alt="Planet"
                      width={24}
                      height={24}
                    />
                  </div>
                </Card>
                <Card className="w-full min-w-0 max-w-full">
                  <p className="text-body-primary">Temperatuur</p>
                  <span className="text-2xs text-body-primary text-text-secondary">
                    {planet?.temperatuurSter} K
                  </span>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button
            label="Plant je vlag"
            icon="/flag.svg"
            onClick={onShowFlagForm}
          />
        </div>
      </div>
    </>
  );
};

export default RightInfoColumn;
