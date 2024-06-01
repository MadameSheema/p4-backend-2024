import { z } from "zod";

export const idParamSchema = z.object({
    id: z.coerce.number(),
});

export const bookingBodySchema = z.object({
    entryDate: z.coerce.date(),
    exitDate: z.coerce.date(),
    dogId: z.coerce.number(),
    roomId: z.coerce.number(),
    price: z.coerce.number(),
}).strict();

export const putBookingBodySchema = bookingBodySchema.partial();

export const dogBodySchema = z.object({
    name: z.string(),
    breed: z.string(),
    ownerId: z.coerce.number(),
}).strict();

export const putDogBodySchema = dogBodySchema.partial();

export const ownerBodySchema = z.object({
    fullName: z.string(),
    email: z.string(),
    address: z.string(),
}).strict();

export const putOwnerBodySchema = ownerBodySchema.partial();

export const roomBodySchema = z.object({
    roomNumber: z.coerce.number(),
    name: z.string(),
    size: z.coerce.number(),
}).strict();

export const putRoomBodySchema = roomBodySchema.partial();