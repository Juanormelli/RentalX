import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";




class RentalRepositoryInMemory implements IRentalsRepository{
    rentals:Rental[] = []
    
    
    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.id === car_id && rental.end_date === null)
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find((rental)=>rental.user_id === user_id && rental.end_date === null)
    }

}

export{RentalRepositoryInMemory}