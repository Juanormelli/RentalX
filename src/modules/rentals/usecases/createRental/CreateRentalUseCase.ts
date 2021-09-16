

import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepository } from "../../../cars/infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository} from "../../repository/IRentalsRepository";




interface IRequest{
    user_id: string;
    car_id: string;
    expect_return_date:Date;

}

@injectable()
class CreateRentalUseCase{

    constructor(
        @inject("RentalRepository")
        private rentalsRepository:IRentalsRepository,
        @inject("DayJsDateProvider")
        private dataProvider:IDateProvider,
        @inject("CarsRepository")
        private carsRepository:ICarsRepository
    ){

    }

    async execute({user_id, car_id, expect_return_date}:IRequest): Promise<Rental>{

        const carsUnAvailable= await this.rentalsRepository.findOpenRentalByCarId(car_id);
        const minRentTime= 24
        if (carsUnAvailable){
            throw new AppError("Car is unavailable")

        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser){
            throw new AppError("User have another rental open")
        }

        
        

        const compare = await this.dataProvider.compare(this.dataProvider.dateNow(),expect_return_date)
        
        console.log(compare)
        if(compare < minRentTime){
            throw new AppError("The rent minimum time is 24 hours")
        }

        const rent = await this.rentalsRepository.create({user_id, car_id, expect_return_date})

        await this.carsRepository.updateAvailable(car_id, false)

        return rent


    }

}


export{CreateRentalUseCase}