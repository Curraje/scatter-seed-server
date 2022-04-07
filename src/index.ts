import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
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
import { GraphQLFormattedError } from "graphql";
import { customResolvers } from "./graphql";
import expressJwt from "express-jwt";
import { permissions, SECRET } from "./services/auth.service";
import { applyMiddleware } from "graphql-middleware";

const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

const allowList: string = "*";

const corsOptions = {
  origin: allowList,
  credentials: true,
};

(async () => {
  const app = express();

  app.set("trust proxy", "loopback");
  app.disable("x-powered-by");
  app.use(morgan("short"));
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })); // { contentSecurityPolicy: isDevelopment ? false : undefined }
  app.use(cors(corsOptions));
  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    expressJwt({
      secret: SECRET,
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );

  app.use(async function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send({
        errors: [
          {
            message: err.message.includes("expired")
              ? "Your login has expired."
              : "Invalid Token sent...",
          },
        ],
      });
    }
  });

  const apolloServer = new ApolloServer({
    schema: applyMiddleware(
      await buildSchema({
        resolvers: [...customResolvers, ...resolvers], // only for prototyping, will only expose some resolvers and use custom ones
        emitSchemaFile: isDevelopment,
      }),
      permissions
    ),
    context: ({ req, res }) => ({ req, res, prisma }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    // isDevelopment ? [ApolloServerPluginLandingPageGraphQLPlayground()] : []
    formatError: (error): GraphQLFormattedError => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      if (error.originalError instanceof ArgumentValidationError) {
        const { extensions, locations, message, path } = error;

        if (error && error.extensions) {
          error.extensions.code = "BAD_USER_INPUT";

          if (error.extensions?.exception?.validationErrors) {
            const validationErrors = error.extensions.exception.validationErrors.map((val: any) => {
              const constraints = Object.keys(val?.constraints)?.map((key: any) => {
                return {
                  code: key,
                  message: val?.constraints[key],
                };
              });

              return {
                ...val,
                errors: constraints,
                constraints: undefined,
              };
            });

            error.extensions.exception.validationErrors = validationErrors;
          }
        }

        return {
          message,
          locations,
          path,
          extensions,
        };
      }

      console.error(error, null, 2); // log error message

      return error;
    },
    introspection: true,
    // formatResponse: (response, requestContext) => {
    //   if (response.errors)
    //     if (requestContext.response?.http) {
    //       requestContext.response.http.status = 401;
    //     }
    //   return response;
    // },
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
