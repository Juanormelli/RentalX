import { Router } from "express";
import { CreateUserController } from "../../src/modules/accounts/usecases/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
