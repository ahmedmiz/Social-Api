
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { apiErrorHandling, unCaughtErrorHandler } from '../util/errorHandling';


export function validate(schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      return next();
    } catch (error) {
        if (error instanceof z.ZodError) 
           apiErrorHandling(error, req , res ,"Validation failed" ) 
        else 
            unCaughtErrorHandler(error, req , res , next);
    }
  };
}