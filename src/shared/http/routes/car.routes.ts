import { Router } from "express";
import { CreateUserController } from "../../../modules/accounts/usecases/createUser/CreateUserController";
import { CreateCarController } from "../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../../../modules/cars/useCases/listCars/ListCarsController";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";




const carsRoutes = Router()

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post("/",ensureAuthenticated,ensureAdmin, createCarController.handle)

carsRoutes.get("/available", listCarsController.handle )

carsRoutes.post("/specifications/:id",ensureAuthenticated,ensureAdmin, createCarSpecificationController.handle)

export {carsRoutes}