import type { Owner } from "@prisma/client";
import { db } from "../db";

type OwnerData = Omit<Owner, 'ownerId'>;
type UpdateOwnerData = Partial<OwnerData>;
type BulkUpdateOwnerData = {
    id: number,
    data: UpdateOwnerData
};

export const findAllOwners = async (): Promise<Owner[]> => {
    return await db.owner.findMany();
};

export const findOwner = async (ownerId: number): Promise<Owner> => {
    return await db.owner.findUniqueOrThrow({ where: { ownerId } });
};

export const createOwner = async (data: OwnerData): Promise<Owner> => {
    return await db.owner.create({ data });
};

export const createOwners = async (data: OwnerData[]): Promise<Owner[]> => {
    await db.owner.createMany({ data });
    const createdOwners = await db.owner.findMany({
        where: {
            OR: data.map(owner => ({
                fullName: owner.fullName,
                email: owner.email,
                address: owner.address,
            })),
        },
    });
    return createdOwners;
};

export const updateOwner = async (ownerId: number, data: UpdateOwnerData): Promise<Owner> => {
    return await db.owner.update({
        where: { ownerId },
        data
    });
};

export const updateOwners = async (ownerUpdates: BulkUpdateOwnerData[]): Promise<Owner[]> => {
    const updatesPromises = ownerUpdates.map(update =>
        db.owner.update({
            where: { ownerId: update.id },
            data: update.data
        })
    );
    return await Promise.all(updatesPromises);
};

export const deleteOwner = async (ownerId: number): Promise<Owner> => {
    return await db.owner.delete({
        where: { ownerId }
    });
};

export const deleteOwners = async (ownersIds: number[]): Promise<Owner[]> => {
    const ownersToDelete = await db.owner.findMany({
        where: { ownerId: { in: ownersIds } }
    });
    await db.owner.deleteMany({
        where: { ownerId: { in: ownersIds } }
    });
    return ownersToDelete;
};
