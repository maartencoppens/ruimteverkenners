import { Planeet } from "@prisma/client";
import React from "react";
import Card from "../components/Card";
import QrCode from "../components/QrCode";

type ExtraInfoProps = {
  planet: Planeet | null;
};

const ExtraInfo = ({ planet }: ExtraInfoProps) => {
  return (
    <div className="h-full flex items-center justify-between w-full">
      <Card className="w-full h-full p-4 flex flex-col gap-xs relative">
        <h2 className="text-title-primary title-gradient text-center border-b-4 border-border-tertiary pb-2">
          Extra Info
        </h2>
        <div className="flex flex-col gap-lg">
          <div className="flex flex-col gap-2xs">
            <h3 className="text-subtitle-primary text-text-secondary">
              Help, wat betekent dit?
            </h3>
            <p className="text-body-primary">
              <span className="text-title font-bold">AE</span> ≈ 194,6 mln. km
              (Astronomische eenheid, gemiddelde afstand aarde-zon)
            </p>
            <p className="text-body-primary">
              <span className="text-title font-bold">g</span> = 9,81 m/s²
              (Versnelling waarmee een voorwerp naar de aarde toe valt)
            </p>
            <p className="text-body-primary">
              <span className="text-title font-bold">Lichtjaar</span> ≈ 9,46
              bln. km (Afstand die licht in 1 jaar aflegt)
            </p>
          </div>

          <div className="flex flex-col gap-2xs">
            <h3 className="text-subtitle-primary text-text-secondary">
              Nieuwsgierig?
            </h3>
            <p className="text-body-primary">
              <span className="text-title font-bold">Weetje</span>:{" "}
              {planet?.weetje}
            </p>
            <p className="text-body-primary">
              <span className="text-title font-bold">Planeettype</span> ={" "}
              {planet?.planeettype}
            </p>
            <p className="text-body-primary">
              <span className="text-title font-bold">Stertype</span> ={" "}
              {planet?.stertype}
            </p>
            <p className="text-body-primary">
              <span className="text-title font-bold">Stermassa</span> ={" "}
              {planet?.stermassa}
            </p>
            <p className="text-body-primary">
              <span className="text-title font-bold">Stergrootte</span> ={" "}
              {planet?.sterstraal}
            </p>
          </div>
        </div>
        <QrCode
          className="absolute bottom-0 right-0"
          nasaUrl={planet?.nasaUrl ?? undefined}
        />
      </Card>
    </div>
  );
};

export default ExtraInfo;
