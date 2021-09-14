import{ Router} from "express"
import { CreateRentalController } from "../../../modules/rentals/usecases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../modules/rentals/usecases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "../../../modules/rentals/usecases/listRentalByUser/ListRentalByUserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";




const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController()

rentalRoutes.post("/",ensureAuthenticated,createRentalController.handle )
rentalRoutes.post("/devolution/:id",ensureAuthenticated,devolutionRentalController.handle)
rentalRoutes.get("/user",ensureAuthenticated,listRentalByUserController.handle)



export {rentalRoutes}