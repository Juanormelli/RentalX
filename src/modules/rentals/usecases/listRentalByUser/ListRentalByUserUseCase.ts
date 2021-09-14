import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repository/IRentalsRepository";


@injectable()
class ListRentalByUserUseCase{
    constructor(
        @inject("RentalRepository")
        private rentalsRepository:IRentalsRepository
    ){

    }

    async execute(user_id: string){


        const rentalsByUser = await this.rentalsRepository.findByUserId(user_id)

        return rentalsByUser

    }
}


export{ListRentalByUserUseCase}