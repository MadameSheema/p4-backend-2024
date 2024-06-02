import { Router } from 'express';
import { send } from './response';
import { catchErrors } from './errors';
import { createBooking, createBookings, deleteBooking, findAllBookings, findBooking, updateBooking, updateBookings } from '../prisma/queries/bookings';
import { bookingBodySchema, bookingBulkBodySchema, idParamSchema, putBookingBodySchema, putBulkBookingBodySchema } from './schemas';

const router = Router();

router.get('/', catchErrors(async (_req, res) => {
    const booking = await findAllBookings();
    send(res).ok(booking);
}));

router.get('/:id', catchErrors(async (req, res) => {
    const { id: bookingId } = idParamSchema.parse(req.params);
    const booking = await findBooking(bookingId);
    send(res).ok(booking);
}));

router.post('/bulk', catchErrors(async (req, res) => {
    const data = bookingBulkBodySchema.parse(req.body);
    const booking = await createBookings(data);
    send(res).createOk(booking);
}));

router.post('/', catchErrors(async (req, res) => {  
    const data = bookingBodySchema.parse(req.body);
    const booking = await createBooking(data);
    send(res).createOk(booking);
}));

router.put('/bulk', catchErrors(async (req, res) => {    
    const data = putBulkBookingBodySchema.parse(req.body);
    const booking = await updateBookings(data);
    send(res).ok(booking);
}));

router.put('/:id', catchErrors(async (req, res) => {
    const { id: bookingId } = idParamSchema.parse(req.params);
    const data = putBookingBodySchema.parse(req.body);
    const booking = await updateBooking(bookingId, data);
    send(res).ok(booking);
}));

router.delete('/:id', catchErrors(async (req, res) => {
    const { id: bookingId } = idParamSchema.parse(req.params);
    const booking = await deleteBooking(bookingId);
    send(res).ok(booking);
}));

export default router