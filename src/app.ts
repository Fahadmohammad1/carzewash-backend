import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// app routes

app.get("/health", (req: Request, res: Response) => {
  res.send("Api is Working fine !");
});

//Not Found
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "No Data Found",
    error: "",
  });
});

export default app;
