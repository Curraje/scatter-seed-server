import { PrismaClient, Prisma } from "@prisma/client";
import * as csv from "fast-csv";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
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

async function main() {
  console.log(`Start seeding... 🌱`);

  // Lazy check, if user table has anything in it don't bother seeding
  if ((await prisma.user.count()) > 0)
    throw Error("Database already has data 💥. Run `prisma migrate reset` to reseed 🌱.");

  fs.createReadStream(path.resolve(__dirname, "PLANT_DATA.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
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

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
