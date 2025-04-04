import * as winston from 'winston';
import { Request, Response, NextFunction } from 'express';
import { userErrorsLogPath , serverErrorsLogPath } from './path';

// Configure Winston logger
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);
const userErrorsFile = new winston.transports.File({
  filename: userErrorsLogPath, // Correct path to the log file
  level: 'error',
  format: logFormat,
});
const serverErrorsFile = new winston.transports.File({
  filename: serverErrorsLogPath, // Correct path to the log file
  level: 'error',
  format: logFormat,
}); 
const userLogger = winston.createLogger({
  level: 'error',
  transports: [userErrorsFile],
});
const serverLogger = winston.createLogger({
  level: 'error',
  transports: [serverErrorsFile],
});

// Uncaught error handler
export function unCaughtErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  serverLogger.error(`Uncaught Error in:`, err);
  res.status(500).json({ error: 'Internal Server Error', "success" : false });
}


// API error handler
export function apiErrorHandling(
  err: any,
  req: Request,
  res: Response,
  message: string,
  status: number = 500
) {
  const error = {
    message: message,
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
    },
    stack: err.stack, // Capture the error stack trace
  };

  userLogger.error('API Error:', error);
  res.status(status).json({ message , "succsess": false });
}
export class NotFoundError extends Error { 
  constructor(message: string) {  
        super(message);  
        this.name = "NotFoundError";  
    }  
}
export class ValidationError extends Error {  
    constructor(message: string) {  
        super(message);  
        this.name = "ValidationError";  
    }  
}