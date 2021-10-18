import express, {NextFunction, Request, Response } from "express";
import "express-async-errors"
import upload from "../../config/upload";
import { AppError } from "../errors/AppError";
import { router } from "./routes";
import "reflect-metadata"
import "dotenv/config" 
import swaggerUI from "swagger-ui-express";
import swaggerFile from "../../swagger.json";

import createConnection from "../infra/typeorm";
import "../container";
import  cors  from 'cors';
import rateLimiter from "../http/middleware/rateLimiter"

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";



createConnection();
const app = express();
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

 
  tracesSampleRate: 1.0,
});

app.use(rateLimiter);
app.use(express.json());
app.use(cors())


app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());



app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(router);

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 429 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal Server Error - ${err.message}`,
  });
});

export {app}
