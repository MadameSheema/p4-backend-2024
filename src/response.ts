import type { Response as ExpressResp } from 'express'

enum HttpStatusCode {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500,
};

export const send = (res: ExpressResp) => {
    return {
        ok: (data: any) => res.status(HttpStatusCode.Ok).json(data),
        internalError: (msg: string) => res.status(HttpStatusCode.InternalServerError).send(msg), 
    }
};