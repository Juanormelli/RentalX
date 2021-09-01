import { Router } from "express";
import { CreateUserController } from "../../../modules/accounts/usecases/createUser/CreateUserController";
import { CreateCarController } from "../../../modules/cars/useCases/createCar/CreateCarController";



const carsRoutes = Router()

const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle)


export {carsRoutes}