import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repository/IRentalsRepository";


interface IRequest{
    user_id: string;
    car_id: string;
    expect_return_date:Date;

}


class CreateRentalUseCase{

    constructor(
        private rentalsRepository:IRentalsRepository
    ){

    }

    async execute({user_id, car_id, expect_return_date}:IRequest): Promise<Rental>{

        const carsUnAvailable= await this.rentalsRepository.findOpenRentalByCarId(car_id);

        if (carsUnAvailable){
            throw new AppError("Car is unavailable",400)

        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser){
            throw new AppError("User have another rental open", 400)
        }

        const rent = await this.rentalsRepository.create({user_id, car_id, expect_return_date})

        return rent


    }

}


export{CreateRentalUseCase}