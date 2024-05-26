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
        createOk: (data: any) => res.status(HttpStatusCode.Created).send(data),
        notFound: (msg: string = 'Not found.') => res.status(HttpStatusCode.NotFound).send(msg),
        badRequest: (msg: string) => res.status(HttpStatusCode.BadRequest).send(msg),
        internalError: (msg: string) => res.status(HttpStatusCode.InternalServerError).send(msg), 
    }
};