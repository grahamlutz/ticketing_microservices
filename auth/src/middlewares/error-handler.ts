import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log('handling error as validation error');
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('handling error as database connection error');
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'something went wrong' }]
  });
}