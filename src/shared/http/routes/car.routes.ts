import { Router } from "express";
import { CreateUserController } from "../../../modules/accounts/usecases/createUser/CreateUserController";
import { CreateCarController } from "../../../modules/cars/useCases/createCar/CreateCarController";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";




const carsRoutes = Router()

const createCarController = new CreateCarController();

carsRoutes.post("/",ensureAuthenticated,ensureAdmin, createCarController.handle)


export {carsRoutes}