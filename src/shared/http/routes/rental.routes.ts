import{ Router} from "express"
import { CreateRentalController } from "../../../modules/rentals/usecases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";




const rentalRoutes = Router();

const createRentalController = new CreateRentalController();


rentalRoutes.post("/",ensureAuthenticated,createRentalController.handle )


export {rentalRoutes}