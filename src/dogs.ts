import { Router } from 'express';
import { send } from './response';
import { catchErrors } from './errors';
import { findAllDogs, findDog, createDog, updateDog, deleteDog, createDogs, updateDogs, deleteDogs } from '../prisma/queries/dogs';
import { bulkDelete, dogBodySchema, dogBulkBodySchema, idParamSchema, putBulkDogBodySchema, putDogBodySchema } from './schemas';

const router = Router();

router.get('/', catchErrors(async (_req, res) => {
    const dogs = await findAllDogs();
    send(res).ok(dogs);
}));

router.get('/:id', catchErrors(async (req, res) => {
    const { id: dogId } = idParamSchema.parse(req.params);
    const dog = await findDog(dogId);
    send(res).ok(dog);
}));

router.post('/bulk', catchErrors(async (req, res) => {
    const data = dogBulkBodySchema.parse(req.body);
    const dogs = await createDogs(data);
    send(res).createOk(dogs);
}));

router.post('/', catchErrors(async (req, res) => {
    const data = dogBodySchema.parse(req.body);
    const dog = await createDog(data);
    send(res).createOk(dog);
}));

router.put('/bulk', catchErrors(async (req, res) => {
    const data = putBulkDogBodySchema.parse(req.body);
    const dogs = await updateDogs(data);
    send(res).ok(dogs);
}));

router.put('/:id', catchErrors(async (req, res) => {
    const { id: dogId } = idParamSchema.parse(req.params);
    const data = putDogBodySchema.parse(req.body);
    const dog = await updateDog(dogId, data)
    send(res).ok(dog);
}));

router.delete('/bulk', catchErrors(async (req, res) => {
    const { ids } = bulkDelete.parse(req.body);
    const dogs = await deleteDogs(ids);
    send(res).ok(dogs);
}));

router.delete('/:id', catchErrors(async (req, res) => {
    const { id: dogId } = idParamSchema.parse(req.params);
    const dog = await deleteDog(dogId);
    send(res).ok(dog);
}));

export default router