import { Router } from "express";
import { catchErrors } from "./errors";
import { send } from "./response";
import {
  createOwner,
  createOwners,
  deleteOwner,
  deleteOwners,
  findAllOwners,
  findOwner,
  updateOwner,
  updateOwners
} from "../prisma/queries/owners";
import {
  bulkDelete,
  idParamSchema,
  ownerBodySchema,
  ownerBulkBodySchema,
  putBulkOwnerBodySchema,
  putOwnerBodySchema
} from "./schemas";

const router = Router();

router.get(
  "/",
  catchErrors(async (_req, res) => {
    const owners = await findAllOwners();
    send(res).ok(owners);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: ownerId } = idParamSchema.parse(req.params);
    const owner = await findOwner(ownerId);
    send(res).ok(owner);
  })
);

router.post(
  "/bulk",
  catchErrors(async (req, res) => {
    const data = ownerBulkBodySchema.parse(req.body);
    const owners = await createOwners(data);
    send(res).createOk(owners);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const data = ownerBodySchema.parse(req.body);
    const owner = await createOwner(data);
    send(res).createOk(owner);
  })
);

router.put(
  "/bulk",
  catchErrors(async (req, res) => {
    const data = putBulkOwnerBodySchema.parse(req.body);
    const owners = await updateOwners(data);
    send(res).ok(owners);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: ownerId } = idParamSchema.parse(req.params);
    const data = putOwnerBodySchema.parse(req.body);
    const owner = await updateOwner(ownerId, data);
    send(res).ok(owner);
  })
);

router.delete(
  "/bulk",
  catchErrors(async (req, res) => {
    const { ids } = bulkDelete.parse(req.body);
    const owners = await deleteOwners(ids);
    send(res).ok(owners);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: ownerId } = idParamSchema.parse(req.params);
    const owner = await deleteOwner(ownerId);
    send(res).ok(owner);
  })
);

export default router;
