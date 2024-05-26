import type { Booking, Dog, Owner, Room } from '@prisma/client';
import { db } from '../db'

export const createBooking = async (dogId: number, roomId: number, entryDate: string, exitDate?: string, price?: number, ): Promise<Booking> => {
    return await db.booking.create({
        data: {
            dogId,
            roomId,
            entryDate,
            exitDate,
            price
        }
    });
};
