import type { Room } from '@prisma/client';
import { db } from '../db'

type RoomData = Omit<Room, 'roomId'>;
type UpdateRoomData = Partial<RoomData>;
type BulkUpdateRoomData = {
    id: number,
    data: UpdateRoomData
};

export const findAllRooms = async (): Promise<Room[]> => {
    return await db.room.findMany();
};

export const findRoom = async (roomId: number): Promise<Room> => {
    return await db.room.findUniqueOrThrow({ where: { roomId } });
};

export const createRoom = async (data: RoomData): Promise<Room> => {
    return await db.room.create({data});
};

export const createRooms = async (data: RoomData[]): Promise<Room[]> => {
    await db.room.createMany({ data });
    const createdRooms = await db.room.findMany({
        where: {
          OR: data.map(room => ({
            roomNumber: room.roomNumber,
            name: room.name,
            size: room.size,
          })),
        },
      });
      return createdRooms;
};

export const updateRoom = async (roomId: number, data: UpdateRoomData): Promise<Room> => {
    return await db.room.update({
        where: { roomId },
        data
    });
};

export const updateRooms = async (roomsUpdates: BulkUpdateRoomData[]): Promise<Room[]> => {
    const updatesPromises = roomsUpdates.map(update => 
        db.room.update({
          where: { roomId: update.id },
          data: update.data
        })
      );
    return await Promise.all(updatesPromises);  
};

export const deleteRoom = async (roomId: number): Promise<Room> => {
    return await db.room.delete({
        where: { roomId }
    });
};

export const deleteRooms = async (roomsIds: number[]): Promise<Room[]> => {
    const roomsToDelete = await db.room.findMany({
        where: { roomId: { in: roomsIds } }
    });
    await db.room.deleteMany({
        where: { roomId: {in: roomsIds} }
    });
    return roomsToDelete;
};

