
import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "./response";

export const defaultErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    return send(res).internalError(`Internal error.`);
};

export const catchErrors = (myHandler: RequestHandler): RequestHandler =>
    async (req, res, next) => {
        try {
            await myHandler(req, res, next);
        } catch (e) {
            next(e);
        }
    };
