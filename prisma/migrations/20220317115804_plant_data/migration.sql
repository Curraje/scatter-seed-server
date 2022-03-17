-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "CommonName" TEXT NOT NULL,
    "BotanicalName" TEXT NOT NULL,
    "PlantType" TEXT NOT NULL,
    "SunExposure" TEXT NOT NULL,
    "SoilpH" TEXT NOT NULL,
    "BloomTime" TEXT NOT NULL,
    "FlowerColour" TEXT NOT NULL,
    "HardinessZones" TEXT NOT NULL,
    "SeedDepth" TEXT NOT NULL,
    "SproutsIn" TEXT NOT NULL,
    "IdealTemp" TEXT NOT NULL,
    "PlantSpacing" TEXT NOT NULL,
    "FrostHardy" TEXT NOT NULL,
    "MinFullSun" TEXT NOT NULL,
    "RowWidth" TEXT NOT NULL,
    "DaystoMaturity" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);
