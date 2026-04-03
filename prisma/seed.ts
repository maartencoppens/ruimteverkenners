import { Planeettype, PrismaClient, Stertype } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.planeet.createMany({
    data: [
      {
        planeetnaam: "Kepler-452 b",
        planeettype: Planeettype.SUPERAARDE,
        massaPlaneet: 5,
        diameterPlaneet: 20387.2,
        gravitatiekracht: 18.64,
        jaarTovAarde: 384.8,
        afstandVanAarde: 1400,
        afstandVanSter: 1.05,
        weetje:
          "Kepler-452 b staat op de juiste afstand van zijn ster voor vloeibaar water. Door de omvang van de planeet zouden oceanen al miljarden jaren kunnen bestaan.",
        stertype: Stertype.G,
        stermassa: 1.04,
        sterstraal: 1.1,
        temperatuurSter: 5757,
        levensduurSter: 10,
        leeftijdSter: 6,
        aantalPlanetenStelsel: 1,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
