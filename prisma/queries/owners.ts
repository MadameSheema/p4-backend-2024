import type { Owner } from "@prisma/client";
import { db } from "../db";

type OwnerData = Omit<Owner, 'ownerId'>
type UpdateOwnerData = Partial<OwnerData>

export const findAllOwners = async (): Promise<Owner[]> => {
    return await db.owner.findMany();
};

export const findOwner = async (ownerId: number): Promise<Owner> => {
    return await db.owner.findUniqueOrThrow({ where: { ownerId } });
};

export const createOwner = async (data: OwnerData): Promise<Owner> => {
    return await db.owner.create({data});
};

export const updateOwner = async (ownerId: number, data: UpdateOwnerData) : Promise<Owner> => {
    return await db.owner.update({
        where: { ownerId },
        data
    });
}

export const deleteOwner = async (ownerId: number): Promise<Owner> => {
    return await db.owner.delete({
        where: { ownerId }
    });
};
