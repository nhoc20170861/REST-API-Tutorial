import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

/**
 * Middleware to validate request body, query and params against a given zod schema.
 * If validation fails, returns a 400 response with the corresponding errors.
 * @param schema - The zod schema to validate against.
 * @returns An express middleware function that handles the validation.
 */
const validate = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Parse the request body, query and params against the given schema.
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            // If validation succeeds, call the next middleware function in the stack.
            next();
        } catch (e: any) {
            // If validation fails, return a 400 response with the errors.
            return res.status(400).send(e.errors);
        }
    };
};

export default validate;
