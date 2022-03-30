import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ArgumentValidationError, buildSchema } from "type-graphql";
import { prisma } from "./context";
import { resolvers } from "./@generated/type-graphql";
import { ApolloError, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { isDevelopment } from "./utils/helper.utils";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { RegisterResolver } from "./graphql";
import { GraphQLFormattedError } from "graphql";

const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

const allowList: string = isDevelopment ? "*" : HOSTNAME;

const corsOptions = {
  origin: allowList,
  credentials: true,
};

(async () => {
  const app = express();

  app.set("trust proxy", "loopback");
  app.disable("x-powered-by");
  app.use(morgan("short"));
  app.use(helmet({ contentSecurityPolicy: isDevelopment ? false : undefined }));
  app.use(cors(corsOptions));
  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver, ...resolvers], // only for prototyping, will only expose some resolvers and use custom ones
    }),
    context: ({ req, res }) => ({ req, res, prisma }),
    plugins: isDevelopment ? [ApolloServerPluginLandingPageGraphQLPlayground()] : [],
    formatError: (error): GraphQLFormattedError => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      if (error.originalError instanceof ArgumentValidationError) {
        const { extensions, locations, message, path } = error;

        if (error && error.extensions) {
          error.extensions.code = "BAD_USER_INPUT";
        }

        return {
          message,
          locations,
          path,
          extensions,
        };
      }

      return error;
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: corsOptions });

  // Not Found Handler
  app.use((req, res) => {
    return res.status(404).send({
      message: `No route to ${req.url}`,
      debug:
        (isDevelopment && {
          request: {
            ip: req.ip,
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query,
          },
        }) ||
        undefined,
    });
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      `🚀 Server ready at: ${HOSTNAME}:${port}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-typegraphql-crud#using-the-graphql-api`
    );
  });
})();
