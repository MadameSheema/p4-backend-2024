import { Router } from 'express';
import { z } from 'zod';
import { catchErrors } from './errors';
import { send } from './response';
import { createOwner, deleteOwner, findAllOwners, findOwner, updateOwner } from '../prisma/queries/owners';

const router = Router();

const idParamSchema = z.object({
    id: z.coerce.number(),
});

const ownerBodySchema = z.object({
    fullName: z.string(),
    email: z.string(),
    address: z.string(),
}).strict();

const putOwnerBodySchema = ownerBodySchema.partial();

router.get('/', catchErrors(async (_req, res) => {
    const owners = await findAllOwners();
    send(res).ok(owners);
}));

router.get('/:id', catchErrors(async (req, res) => {
    const { id: ownerId } = idParamSchema.parse(req.params);
    const owner = await findOwner(ownerId);
    send(res).ok(owner);
}));

router.post('/', catchErrors(async (req, res) => {
    const data = ownerBodySchema.parse(req.body);
    const owner = await createOwner(data);
    send(res).createOk(owner);
}));

router.put('/:id', catchErrors(async (req, res) => {
    const { id: ownerId } = idParamSchema.parse(req.params);
    const data = putOwnerBodySchema.parse(req.body);
    const dog = await updateOwner(ownerId, data)
    send(res).ok(dog);
}));

router.delete('/:id', catchErrors(async (req, res) => {
    const { id: ownerId } = idParamSchema.parse(req.params);
    const dog = await deleteOwner(ownerId);
    send(res).ok(dog);
}));



export default router