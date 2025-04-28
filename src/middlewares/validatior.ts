

import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { apiErrorHandling, unCaughtErrorHandler } from '../util/errorHandling';

function formatZodErrorMessage(errorMessage: string): string {
  try {
    // Extract the JSON part from the error message
    const jsonMatch = errorMessage.match(/\[\n[\s\S]*\n\]/);
    if (!jsonMatch) return errorMessage;
    
    const jsonString = jsonMatch[0];
    // Parse the JSON string to get the error objects
    const errorObjects = JSON.parse(jsonString);
    
    if (!Array.isArray(errorObjects) || errorObjects.length === 0) {
      return errorMessage;
    }
    
    // Format each error into a readable message
    const formattedErrors = errorObjects.map(error => {
      const path = error.path.join('.');
      const expected = error.expected || '(any)';
      const received = error.received || 'nothing';
      const message = error.message || 'Invalid value';
      
      return `Field '${path}': ${message}. Expected ${expected}, received ${received}.`;
    });
    
    // Join all formatted errors with line breaks
    return formattedErrors.join('\n');
  } catch (err) {
    // If parsing fails, return the original message
    console.error("Error formatting Zod error message:", err);
    return errorMessage;
  }
}


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
          apiErrorHandling(error, req, res, "Validation failed  " + formatZodErrorMessage(error.message)); 
        else 
            unCaughtErrorHandler(error, req , res , next);
    }
  };
}