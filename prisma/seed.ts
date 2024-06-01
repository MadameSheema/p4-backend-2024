import { PrismaClientInitializationError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { createDog } from './queries/dogs';
import { createOwner } from './queries/owners';
import { createRoom } from './queries/rooms';
import { createBooking } from './queries/bookings';

const prismaCatchErrors = async (myMethod: any) => {
    try {
        return await myMethod
    } catch (e) {
        const prismaError = e as PrismaClientValidationError | PrismaClientInitializationError;
        console.log(prismaError.message);
        process.exit(1);
    }
};

const ownerLog = (fullName: string, ownerId: number) => console.log(`Created owner with full name: ${fullName} and id: ${ownerId}`);
const dogLog = (name: string, dogId: number) => console.log(`Created dog with name: ${name} and id: ${dogId}`);
const roomLog = (name: string, roomId: number) => console.log(`Created room with name: ${name} and id: ${roomId}`);
const bookingLog = (bookingId: number) => console.log(`Created booking with id: ${bookingId}`);

const gloria = await prismaCatchErrors(createOwner({ fullName: 'Gloria Hornero', email: 'gloria@test.com', address: 'Sant Pere de Ribes' }));
if (gloria) ownerLog(gloria.fullName, gloria.ownerId);
const ariadna = await prismaCatchErrors(createOwner({ fullName: 'Ariadna F', email: 'ariadna@test.com', address: 'Sant Pere de Ribes' }));
if (ariadna) ownerLog(ariadna.fullName, ariadna.ownerId);

const xoco = await prismaCatchErrors(createDog({ name: 'Xoco', breed: 'Mix', ownerId: gloria.ownerId }));
if (xoco) dogLog(xoco.name, xoco.dogId);
const canino = await prismaCatchErrors(createDog({ name: 'Canino', breed: 'Tulear Cotton', ownerId: ariadna.ownerId }));
if (canino) dogLog(canino.name, canino.dogId);
const avatar = await prismaCatchErrors(createDog({ name: 'Avatar', breed: 'Tulear Cotton', ownerId: ariadna.ownerId }));
if (avatar) dogLog(avatar.name, avatar.dogId);

const jungleRoom = await prismaCatchErrors(createRoom({ name: 'The Jungle', roomNumber: 700, size: 50 }));
if (jungleRoom) roomLog(jungleRoom.name, jungleRoom.roomId);
const gardenRoom = await prismaCatchErrors(createRoom({ name: 'The Garden', roomNumber: 717, size: 30 }));
if (gardenRoom) roomLog(gardenRoom.name, gardenRoom.roomId);
const dreamRoom = await prismaCatchErrors(createRoom({ name: 'The Dream', roomNumber: 720, size: 60 }));
if (dreamRoom) roomLog(dreamRoom.name, dreamRoom.roomId);

const caninoEntry = new Date('2024-04-28T08:00');
const caninoExit = new Date('2024-05-03T17:00');
const avatarEntry = new Date('2024-04-28T08:00');

const caninoBooking = await prismaCatchErrors(createBooking({ dogId: canino.dogId, roomId: dreamRoom.roomId, entryDate: caninoEntry, exitDate: caninoExit, price: 300 }));
if (caninoBooking) bookingLog(caninoBooking.bookingId);
const avatarBooking = await prismaCatchErrors(createBooking({
    dogId: avatar.dogId, roomId: jungleRoom.roomId, entryDate: avatarEntry,
    exitDate: null,
    price: null
}));
if (avatarBooking) bookingLog(avatarBooking.bookingId);