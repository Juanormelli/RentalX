import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";




class RentalRepositoryInMemory implements IRentalsRepository{
    
    rentals:Rental[] = []
    
    
    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.id === car_id && !rental.end_date)
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find((rental)=>rental.user_id === user_id && !rental.end_date)
    }

    async create({user_id, car_id, expect_return_date}:ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental()

        Object.assign(rental,{
            user_id,
            car_id,
            expect_return_date,
            start_date:new Date()
        })

        this.rentals.push(rental)

        return rental

        
    }

}

export{RentalRepositoryInMemory}