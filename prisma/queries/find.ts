import type { Dog } from '@prisma/client';
import { db } from '../db'

export const findBooking = async (dogName: string, entryDate: string): Promise<{ bookingId: number } | null> => {
    return await db.booking.findFirst({
        select: {
            bookingId: true,
        },
        where: {
            entryDate,
            Dog: {
                name: {
                    equals: dogName,
                    mode: 'insensitive'
                }
            }
        }
    });
};

export const findAllBreeds = async (): Promise<{ breed: string }[]> => {
    return await db.dog.findMany({
        select: {
            breed: true,
        },
        orderBy: {
            name: 'asc',
        },
        distinct: 'breed'
    });
};



export const findBookedRooms = async (date: string): Promise<{ name: string, roomNumber: number }[]> => {
    return await db.room.findMany({
        select: {
            name: true,
            roomNumber: true
        },
        where: {
            bookings: {
                some: {
                    entryDate: {
                        lte: date
                    },
                    OR: [
                        {
                            exitDate: {
                                gte: date
                            }
                        },
                        {
                            exitDate: null
                        }
                    ]
                }
            }
        }
    });
};

export const findDogs = async (email: string): Promise<{ name: string, dogId: number }[]> => {
    return await db.dog.findMany({
        select: {
            name: true,
            dogId: true,
        },
        where: {
            owner: {
                email
            }
        },
    });
};