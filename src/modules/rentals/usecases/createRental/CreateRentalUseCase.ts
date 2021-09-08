

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
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
        private rentalsRepository:IRentalsRepository,
        private dataProvider:IDateProvider
    ){

    }

    async execute({user_id, car_id, expect_return_date}:IRequest): Promise<Rental>{

        const carsUnAvailable= await this.rentalsRepository.findOpenRentalByCarId(car_id);
        const minRentTime= 24
        if (carsUnAvailable){
            throw new AppError("Car is unavailable",400)

        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser){
            throw new AppError("User have another rental open", 400)
        }

        
        

        const compare = await this.dataProvider.compare(this.dataProvider.dateNow(),expect_return_date)
        
        console.log(compare)
        if(compare < minRentTime){
            throw new AppError("The rent minimum time is 24 hours", 400)
        }

        const rent = await this.rentalsRepository.create({user_id, car_id, expect_return_date})

        return rent


    }

}


export{CreateRentalUseCase}