import "reflect-metadata";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { context } from "./context";
import { resolvers } from "@generated/type-graphql";

let RedisStore = connectRedis(session);
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);
redisClient.on("error", console.error);

(async () => {
  const app = express();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: "scatter-seed-api",
      secret: "just initializing", // change secret
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // ms -> s -> h -> d -> w -> y = 7 years
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
    }),
    context,
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
