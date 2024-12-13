import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import routes from "./app/routes";
import errorHandler from "./app/middlewares/errorHandler";

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "*" }));

// app routes
app.use("/api", routes);

app.get("/health", (req: Request, res: Response) => {
  res.send("Api is Working fine !");
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

//Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

export default app;
