import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repository/IRentalsRepository";
import { Rental } from "../entities/Rental";



class RentalRepository implements IRentalsRepository{
    private repository :Repository<Rental>
    
    constructor(){
        this.repository = getRepository(Rental)
    }
    
    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        return await this.repository.findOne({ car_id})
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({user_id})
        
    }
    async create({car_id, expect_return_date,user_id}: ICreateRentalDTO): Promise<Rental> {
       const rental =this.repository.create({car_id, expect_return_date,user_id})

       await this.repository.save(rental)

       return rental

    }

}



export{RentalRepository}