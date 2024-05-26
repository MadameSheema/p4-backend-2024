import { findAllDogs } from '../prisma/queries/find';
import { Router } from 'express';
import { send } from './response';
import { catchErrors } from './errors';

const router = Router();

router.get('/', catchErrors(async (_req, res) => {
    const dogs = await findAllDogs();
    send(res).ok(dogs);
}));

export default router