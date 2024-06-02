import type { Booking } from '@prisma/client';
import { db } from '../db'

type BookingData = Omit<Booking, 'bookingId'>;
type UpdateBookingData = Partial<BookingData>;

export const findAllBookings = async (): Promise<Booking[]> => {
    return await db.booking.findMany();
};

export const findBooking = async (bookingId: number): Promise<Booking> => {
    return await db.booking.findUniqueOrThrow({ where: { bookingId } });
};

export const createBooking = async (data: BookingData): Promise<Booking> => {
    return await db.booking.create({ data });
};

export const createBookings = async (data: BookingData[]): Promise<Booking[]> => {
    await db.booking.createMany({ data });
    const createdBookings = await db.booking.findMany({
        where: {
          OR: data.map(booking => ({
            entryDate: booking.entryDate,
            exitDate: booking.exitDate,
            dogId: booking.dogId,
            roomId: booking.roomId,
          })),
        },
      });
      return createdBookings;
};

export const updateBooking = async (bookingId: number, data: UpdateBookingData): Promise<Booking> => {
    return await db.booking.update({
        where: { bookingId },
        data
    });
};

export const deleteBooking = async (bookingId: number): Promise<Booking> => {
    return await db.booking.delete({
        where: { bookingId }
    });
};
