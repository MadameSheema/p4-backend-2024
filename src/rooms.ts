import { Router } from 'express';
import { catchErrors } from './errors';
import { send } from './response';
import { createRoom, createRooms, deleteRoom, deleteRooms, findAllRooms, findRoom, updateRoom, updateRooms } from '../prisma/queries/rooms';
import { idParamSchema, roomBodySchema, putRoomBodySchema, roomBulkBodySchema, putBulkRoomBodySchema, bulkDelete } from './schemas';

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

router.post('/bulk', catchErrors(async (req, res) => {
    const data = roomBulkBodySchema.parse(req.body);
    const rooms = await createRooms(data);
    send(res).createOk(rooms);
}));

router.post('/', catchErrors(async (req, res) => {
    const data = roomBodySchema.parse(req.body);
    const room = await createRoom(data);
    send(res).createOk(room);
}));

router.put('/bulk', catchErrors(async (req, res) => {
    const data = putBulkRoomBodySchema.parse(req.body);
    const rooms = await updateRooms(data);
    send(res).ok(rooms);
}));

router.put('/:id', catchErrors(async (req, res) => {
    const { id: roomId } = idParamSchema.parse(req.params);
    const data = putRoomBodySchema.parse(req.body);
    const room = await updateRoom(roomId, data)
    send(res).ok(room);
}));

router.delete('/bulk', catchErrors(async (req, res) => {
    const { ids } = bulkDelete.parse(req.body);
    const rooms = await deleteRooms(ids);
    send(res).ok(rooms);
}));

router.delete('/:id', catchErrors(async (req, res) => {
    const { id: roomId } = idParamSchema.parse(req.params);
    const room = await deleteRoom(roomId);
    send(res).ok(room);
}));

export default router