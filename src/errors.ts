
import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "./response";
import type { ZodError } from "zod";

const zodErrorMessage = (err: ZodError): string => {
    console.log(err.issues);
    const [issue] = err.issues;
    switch (issue.code) {
      case 'invalid_type': 
        return `${issue.message} for ${issue.path[0]} parameter`;
      case 'unrecognized_keys':
        return `The following parameters does not exist in the schema: ${issue.keys}`  
      default: 
        return 'There is a problem with the data sent.';
    }
  };

export const defaultErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.log(err);
    switch (err.name) {
      case 'NotFoundError':
        return send(res).notFound();
      case 'PrismaClientKnownRequestError':  
        return send(res).notFound(err.message);
      case 'ZodError':
        return send(res).badRequest(zodErrorMessage(err));
      default:
        return send(res).internalError('Internal error.');
    }
};

export const catchErrors = (myHandler: RequestHandler): RequestHandler =>
    async (req, res, next) => {
        try {
            await myHandler(req, res, next);
        } catch (e) {
            next(e);
        }
    };
