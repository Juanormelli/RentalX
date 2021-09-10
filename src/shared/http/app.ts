import express, {NextFunction, Request, Response } from "express";
import "express-async-errors"
import { AppError } from "../errors/AppError";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "../../swagger.json";

import createConnection from "../infra/typeorm";
import "../container";

createConnection();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

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