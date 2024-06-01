import type { Dog } from '@prisma/client';
import { db } from '../db'

type DogData = Omit<Dog, 'dogId'>;
type UpdateDogData = Partial<DogData>;

export const findAllDogs = async (): Promise<Dog[]> => {
    return await db.dog.findMany();
};

export const findDog = async (dogId: number): Promise<Dog> => {
    return await db.dog.findUniqueOrThrow({ where: { dogId } });
};

export const createDog = async (data: DogData): Promise<Dog> => {
    return await db.dog.create({ data });
};

export const updateDog = async (dogId: number, data: UpdateDogData): Promise<Dog> => {
    return await db.dog.update({
        where: { dogId },
        data
    });
};

export const deleteDog = async (dogId: number): Promise<Dog> => {
    return await db.dog.delete({
        where: { dogId }
    });
};
