import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repository/IRentalsRepository";

interface IRequest{
    id:string;
    user_id:string 
}

@injectable()
class DevolutionRentalUseCase{
    constructor(
        @inject("RentalRepository")
        private rentalRepository :IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository :ICarsRepository,
        @inject("DayJsDateProvider")
        private dataProvider:IDateProvider,
    ){}

    async execute({id, user_id}:IRequest): Promise<Rental>{

        const rental = await this.rentalRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)
        const minRentTime = 1

        if (! rental){
            throw new AppError("Rental does not exist")
        }
        if (rental.end_date!==null){
            throw new AppError("Rental already closed")
        }

        const dateNow = this.dataProvider.dateNow()

        let daily = this.dataProvider.compareInDays(rental.start_date, this.dataProvider.dateNow())

        if (daily<=0){
            daily = minRentTime
        }

        const delay = this.dataProvider.compareInDays(rental.expect_return_date,dateNow)

        let total = 0
        console.log(delay)

        if(delay > 0 ){
            const calculateFine = delay * car.fine_amount;
            total = calculateFine

        }

        total += daily * car.daily_rate

        

        rental.end_date = this.dataProvider.dateNow()
        rental.total = total

        await this.rentalRepository.create(rental)

        await this.carsRepository.updateAvailable(car.id,true)


        return rental



    }

}

export{DevolutionRentalUseCase}