import type { Room } from '@prisma/client';
import { db } from '../db'

type RoomData = Omit<Room, 'roomId'>
type UpdateRoomData = Partial<RoomData>

export const findAllRooms = async (): Promise<Room[]> => {
    return await db.room.findMany();
};

export const findRoom = async (roomId: number): Promise<Room> => {
    return await db.room.findUniqueOrThrow({ where: { roomId } });
};

export const createRoom = async (data: RoomData): Promise<Room> => {
    return await db.room.create({data});
};

export const updateRoom = async (roomId: number, data: UpdateRoomData): Promise<Room> => {
    return await db.room.update({
        where: { roomId },
        data
    });
};

export const deleteRoom = async (roomId: number): Promise<Room> => {
    return await db.room.delete({
        where: { roomId }
    });
};
