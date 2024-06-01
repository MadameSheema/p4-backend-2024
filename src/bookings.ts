import { Router } from 'express';
import { send } from './response';
import { catchErrors } from './errors';
import { z } from 'zod';
import { createBooking, deleteBooking, findAllBookings, findBooking, updateBooking } from '../prisma/queries/bookings';

const router = Router();

const idParamSchema = z.object({
    id: z.coerce.number(),
});

const bookingBodySchema = z.object({
    entryDate: z.coerce.date(),
    exitDate: z.coerce.date(),
    dogId: z.coerce.number(),
    roomId: z.coerce.number(),
    price: z.coerce.number(),
}).strict();

const putBookingBodySchema = bookingBodySchema.partial();

router.get('/', catchErrors(async (_req, res) => {
    const booking = await findAllBookings();
    send(res).ok(booking);
}));

router.get('/:id', catchErrors(async (req, res) => {
    const { id: bookingId } = idParamSchema.parse(req.params);
    const booking = await findBooking(bookingId);
    send(res).ok(booking);
}));

router.post('/', catchErrors(async (req, res) => {
    const data = bookingBodySchema.parse(req.body);
    const booking = await createBooking(data);
    send(res).createOk(booking);
}));

router.put('/:id', catchErrors(async (req, res) => {
    const { id: bookingId } = idParamSchema.parse(req.params);
    const data = putBookingBodySchema.parse(req.body);
    const booking = await updateBooking(bookingId, data)
    send(res).ok(booking);
}));

router.delete('/:id', catchErrors(async (req, res) => {
    const { id: bookingId } = idParamSchema.parse(req.params);
    const booking = await deleteBooking(bookingId);
    send(res).ok(booking);
}));

export default router