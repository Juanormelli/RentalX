import { request, Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateSpecificationController } from "../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middleware/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();


specificationsRoutes.post("/",ensureAuthenticated,ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };
