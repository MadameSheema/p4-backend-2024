import type { Dog } from '@prisma/client';
import { db } from '../db'

type DogData = Omit<Dog, 'dogId'>;
type UpdateDogData = Partial<DogData>;
type BulkUpdateDogData = {
    id: number,
    data: UpdateDogData
}

export const findAllDogs = async (): Promise<Dog[]> => {
    return await db.dog.findMany();
};

export const findDog = async (dogId: number): Promise<Dog> => {
    return await db.dog.findUniqueOrThrow({ where: { dogId } });
};

export const createDog = async (data: DogData): Promise<Dog> => {
    return await db.dog.create({ data });
};

export const createDogs = async (data: DogData[]): Promise<Dog[]> => {
    await db.dog.createMany({ data });
    const createdDogs = await db.dog.findMany({
        where: {
          OR: data.map(dog => ({
            name: dog.name,
            breed: dog.breed,
            ownerId: dog.ownerId
          })),
        },
      });
      return createdDogs;
};

export const updateDog = async (dogId: number, data: UpdateDogData): Promise<Dog> => {
    return await db.dog.update({
        where: { dogId },
        data
    });
};

export const updateDogs = async (dogsUpdates: BulkUpdateDogData[]): Promise<Dog[]> => {
    const updatesPromises = dogsUpdates.map(update => 
        db.dog.update({
          where: { dogId: update.id },
          data: update.data
        })
      );
    return await Promise.all(updatesPromises);  
};

export const deleteDog = async (dogId: number): Promise<Dog> => {
    return await db.dog.delete({
        where: { dogId }
    });
};

export const deleteDogs = async (dogsIds: number[]): Promise<Dog[]> => {
    const dogsToDelete = await db.dog.findMany({
        where: { dogId: { in: dogsIds } }
    });
    await db.booking.deleteMany({
        where: { bookingId: {in: dogsIds} }
    });
    return dogsToDelete;
};
