import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { inject, injectable } from 'tsyringe';

interface IRequest{
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListCarsUseCase{
    
    constructor(
        @inject("CarsRepository")
        private carsRepository:ICarsRepository
    ){}

    async execute({category_id,brand,name}:IRequest): Promise<Car[]>{
        console.log("Aqui Eu")
        const cars = await this.carsRepository.findAvailable(brand,category_id,name)
        console.log(cars)
        return cars
        
    }
}

export {ListCarsUseCase}

