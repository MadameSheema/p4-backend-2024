import type { Dog } from '@prisma/client';
import { db } from '../db'

type dogData = {
    name: string,
    breed: string,
    ownerId: number,
}; 

type updateDogData = Partial<dogData>

export const findAllDogs = async (): Promise<Dog[]> => {
    return await db.dog.findMany();
};

export const findDog = async (dogId: number): Promise<Dog> => {
    return await db.dog.findUniqueOrThrow({ where: { dogId } });
};

export const createDog = async (data: dogData): Promise<Dog> => {
    return await db.dog.create({
            data
        });
};

export const updateDog = async (dogId: number, data: updateDogData) : Promise<Dog> => {
    return await db.dog.update({
        where: { dogId },
        data
    });
}

export const deleteDog = async (dogId: number): Promise<Dog> => {
    return await db.dog.delete({
        where: { dogId }
    });
};
