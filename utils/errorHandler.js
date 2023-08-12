import chalk from "chalk";

export const errorThrow = (errMessage, code, errCause) => {
  let error = new Error(errMessage);
  error.cause = errCause;
  error.code = code;
  throw error;
};
export const ErrorLogger = (err, req, res, next) => {
  console.log(chalk.bold(chalk.redBright(err.message)));
  next(err);
};
export const ErrorHandler = (err, req, res, next) => {
  const statusCode = err.code || 400;
  res.status(statusCode).json({
    success: false,
    cause: err.cause,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
