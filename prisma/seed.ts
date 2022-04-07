import { PrismaClient, Prisma } from "@prisma/client";
import * as csv from "fast-csv";
import * as fs from "fs";
import * as path from "path";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    username: "alicethebest",
    email: "alice@prisma.io",
    password: "",
    location: "Ottawa, Ontario",
    posts: {
      create: [
        {
          title: "Join the Prisma Slack",
          content: "https://slack.prisma.io",
          published: true,
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    username: "nilutheworst",
    password: "",
    location: "Toronto, Ontario",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    username: "mahmoudthegod",
    password: "",
    location: "Windsor, Ontario",
    posts: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          content: "https://www.github.com/prisma/prisma/discussions",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
];

const plantData: Prisma.PlantCreateInput[] = [];

const frostDateData: Prisma.FrostDateCreateInput[] = [];

async function main() {
  console.log(`Start seeding... 🌱`);

  // Lazy check, if user table has anything in it don't bother seeding
  if ((await prisma.user.count()) > 0)
    throw Error("Database already has data 💥. Run `prisma migrate reset` to reseed 🌱.");

  // Seeding Plant Data
  fs.createReadStream(path.resolve(__dirname, "PlantData.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error("ERROR WHILE PARSING PLANT DATA", error))
    .on("data", (row) => {
      row.SowIndoors = Number.parseInt(row.SowIndoors);
      row.Transplant = Number.parseInt(row.Transplant);
      row.SowOutdoors = Number.parseInt(row.SowOutdoors);
      if (isNaN(row.SowIndoors)) row.SowIndoors = null;
      if (isNaN(row.Transplant)) row.Transplant = null;
      if (isNaN(row.SowOutdoors)) row.SowOutdoors = null;
      plantData.push(row);
      console.log(row);
    })
    .on("end", async (rowCount: number) => {
      console.log(`Parsed ${rowCount} rows`);
      for (const p of plantData) {
        const plant = await prisma.plant.create({
          data: p,
        });
        console.log(`Created plant with id: ${plant.id}`);
      }
    });

  // Seeding Frost Date Data
  fs.createReadStream(path.resolve(__dirname, "FrostDates.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (err) => console.error("ERROR WHILE PARSING FROST DATE DATA", err))
    .on("data", (row) => {
      frostDateData.push(row);
      console.log(row);
    })
    .on("end", async (rowCount: number) => {
      console.log(`Parsed ${rowCount} rows`);
      for (const f of frostDateData) {
        const frostDate = await prisma.frostDate.create({
          data: f,
        });
        console.log(`Created Frost Date with id: ${frostDate.id}`);
      }
    });

  for (const u of userData) {
    u.password = await bcrypt.hash("sick_password", 10);
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("🌿 Plant Rows: ", await prisma.plant.count());
    console.log("🍧 Frost Date Rows:", await prisma.frostDate.count());
    console.log("👤 User Rows:", await prisma.user.count());
    console.log(`🌱 Seeding Complete! ✅`);
    await prisma.$disconnect();
  });
