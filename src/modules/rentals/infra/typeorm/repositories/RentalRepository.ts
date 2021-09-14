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
        return await this.repository.findOne({
            where:{car_id, end_date:null}
        })
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where:{user_id, end_date:null}
        })
        
    }
    async create({car_id, expect_return_date,user_id,id,end_date,total}:ICreateRentalDTO): Promise<Rental> {
       const rental =this.repository.create({car_id, expect_return_date,user_id,id,end_date,total})

       await this.repository.save(rental)

       return rental

    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id)

        return rental
    }

    async findByUserId(user_id: string): Promise<Rental[]> {
        const rentals = this.repository.find({ 
            where:{user_id},
            relations:["car"]
        })

        return rentals
    }

}



export{RentalRepository}