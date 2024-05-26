import { Router } from 'express';
import { send } from './response';
import { catchErrors } from './errors';
import { z } from 'zod';
import { findAllDogs, findDog, createDog, updateDog, deleteDog } from '../prisma/queries/dogs';

const router = Router();

const idParamSchema = z.object({
    id: z.coerce.number(),
});

const dogBodySchema = z.object({
    name: z.string(),
    breed: z.string(),
    ownerId: z.coerce.number(),
}).strict();

const putDogBodySchema = dogBodySchema.partial();

router.get('/', catchErrors(async (_req, res) => {
    const dogs = await findAllDogs();
    send(res).ok(dogs);
}));

router.get('/:id', catchErrors(async (req, res) => {
    const { id: dogId } = idParamSchema.parse(req.params);
    const dog = await findDog(dogId);
    send(res).ok(dog);
}));

router.post('/', catchErrors(async (req, res) => {
    const data = dogBodySchema.parse(req.body);
    const dog = await createDog(data);
    send(res).createOk(dog);
}));

router.put('/:id', catchErrors(async (req, res) => {
    const { id: dogId } = idParamSchema.parse(req.params);
    const data = putDogBodySchema.parse(req.body);
    const dog = await updateDog(dogId, data)
    send(res).ok(dog);
}));

router.delete('/:id', catchErrors(async (req, res) => {
    const { id: dogId } = idParamSchema.parse(req.params);
    const dog = await deleteDog(dogId);
    send(res).ok(dog);
}));

export default router