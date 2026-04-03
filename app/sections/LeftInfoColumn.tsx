import Image from "next/image";
import React from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { Planet } from "../types/planet";

type LeftColumnInfoProps = {
  planet: Planet | null;
};

const LeftInfoColumn = ({ planet }: LeftColumnInfoProps) => {
  return (
    <>
      <div className="h-full flex flex-col justify-between overflow-hidden">
        <div>
          <div className="border-b border-border-primary p-4 w-full flex items-center gap-3.5">
            <Image
              src="/planet-blue.svg"
              alt="Planet icon"
              width={40}
              height={40}
              className=""
            />
            <h2 className="text-subtitle-primary">Planeet</h2>
          </div>
          <div className="p-4 flex flex-col items-center">
            <h3 className="text-subtitle-secondary">Grootte</h3>
            <Card className="flex gap-xl justify-center">
              <div>
                <Image
                  src="/aarde-grootte.svg"
                  alt="Earth icon"
                  width={150}
                  height={150}
                />
                <Image
                  src={"/double-arrow.svg"}
                  alt="Double arrow"
                  width={150}
                  height={20}
                />
                <p className="text-center text-body-primary">
                  {planet?.diameterPlaneet}
                </p>
              </div>
              <div className="flex flex-col items-center">
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
          <div className="w-full">
            <h3 className="text-subtitle-secondary">Afstand van de ster</h3>
            <Slider variant="primary" />
          </div>
          <div className="w-full">
            <h3 className="text-subtitle-secondary">Zwaartekracht</h3>
            <Slider variant="secondary" />
          </div>
        </div>
        <Button label="Plant je vlag" />
      </div>
    </>
  );
};

export default LeftInfoColumn;
