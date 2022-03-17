import "reflect-metadata";
import "dotenv/config";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import connectSqlite3 from "connect-sqlite3";
import { createClient } from "redis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { context } from "./context";
import { resolvers } from "./@generated/type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { isDevelopment } from "./utils/helper.utils";
import { v4 as uuidv4 } from "uuid";
import compression from "compression";

// Dev DB
const SQLiteStore = connectSqlite3(session);

// Prod DB
const RedisStore = connectRedis(session);
const redisClient = createClient({ legacyMode: true });
if (!isDevelopment) {
  redisClient.connect().catch(console.error);
  redisClient.on("error", console.error);
}

(async () => {
  const app = express();

  app.set("trust proxy", "loopback");
  app.disable("x-powered-by");
  app.use(compression());

  app.use(
    session({
      store: isDevelopment
        ? new SQLiteStore({ db: "dev-cache.sqlite", concurrentDB: "true" })
        : new RedisStore({ client: redisClient }),
      name: "scatter-seed-api",
      secret: process.env.SESSION_SECRET || uuidv4(), // change secret
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: !isDevelopment,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // ms -> s -> h -> d -> w -> y = 7 years
      },
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
    }),
    context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  // cors false for now
  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      `🚀 Server ready at: http://localhost:${port}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-typegraphql-crud#using-the-graphql-api`
    );
  });
})();
