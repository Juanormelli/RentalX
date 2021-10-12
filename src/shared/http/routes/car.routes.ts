import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../../../modules/accounts/usecases/createUser/CreateUserController";
import { CreateCarController } from "../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../../../modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import uploadConfig from "../../../config/upload";





const carsRoutes = Router()

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();
const uploadCarImages = multer(uploadConfig)

carsRoutes.post("/",ensureAuthenticated,ensureAdmin, createCarController.handle)

carsRoutes.get("/available", listCarsController.handle )

carsRoutes.post("/specifications/:id",ensureAuthenticated,ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post("/images/:id",ensureAuthenticated,ensureAdmin,uploadCarImages.array("images"), uploadCarImageController.handle)

export {carsRoutes}