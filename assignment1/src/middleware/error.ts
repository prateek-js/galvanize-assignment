import { NextFunction, Request, Response } from 'express';
import { errorMessages } from '../helper/constants';

export class BusinessError extends Error {
  public statusCode: number;
  public innerException: Error;
  public constructor(
    statusCode: number,
    message: string,
    innerException?: Error
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'BusinessError';
    this.innerException = innerException;
  }
}

export function errorMiddleware(
  err: BusinessError | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message, err);
  if (err instanceof BusinessError) {
    res.status(err.statusCode).json(err.message);
  } else if (err.statusCode) {
    res.status(err.statusCode).json(err.message);
  } else {
    res.status(500).json(errorMessages.genericErrorMessage);
  }

  //next(err);
}
