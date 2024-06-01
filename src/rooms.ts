import { Router } from 'express';
import { catchErrors } from './errors';
import { send } from './response';
import { createRoom, deleteRoom, findAllRooms, findRoom, updateRoom } from '../prisma/queries/rooms';
import { idParamSchema, roomBodySchema, putRoomBodySchema } from './schemas';

const router = Router();

router.get('/', catchErrors(async (_req, res) => {
    const rooms = await findAllRooms();
    send(res).ok(rooms);
}));

router.get('/:id', catchErrors(async (req, res) => {
    const { id: roomId } = idParamSchema.parse(req.params);
    const room = await findRoom(roomId);
    send(res).ok(room);
}));

router.post('/', catchErrors(async (req, res) => {
    const data = roomBodySchema.parse(req.body);
    const room = await createRoom(data);
    send(res).createOk(room);
}));

router.put('/:id', catchErrors(async (req, res) => {
    const { id: roomId } = idParamSchema.parse(req.params);
    const data = putRoomBodySchema.parse(req.body);
    const dog = await updateRoom(roomId, data)
    send(res).ok(dog);
}));

router.delete('/:id', catchErrors(async (req, res) => {
    const { id: roomId } = idParamSchema.parse(req.params);
    const dog = await deleteRoom(roomId);
    send(res).ok(dog);
}));

export default router