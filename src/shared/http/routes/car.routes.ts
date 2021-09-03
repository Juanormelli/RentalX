import { Router } from "express";
import { CreateUserController } from "../../../modules/accounts/usecases/createUser/CreateUserController";
import { CreateCarController } from "../../../modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "../../../modules/cars/useCases/listCars/ListCarsController";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";




const carsRoutes = Router()

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.post("/",ensureAuthenticated,ensureAdmin, createCarController.handle)

carsRoutes.get("/available", listCarsController.handle )

export {carsRoutes}