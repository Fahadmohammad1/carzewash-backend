import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import config from "../config";
import { AnyError } from "mongodb";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: {
    path: string | number;
    message: string;
  }[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default errorHandler;
