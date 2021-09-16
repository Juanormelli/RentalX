import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { SpecificationRepository } from "../../infra/typeorm/repositories/SpecificationRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository"
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from 'tsyringe';


interface IRequest{
    car_id: string;
    specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase{
    constructor(
       
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository,
        @inject("CarsRepository")
        private carsRepository:ICarsRepository
        ){

    }

    async execute({car_id, specification_id}:IRequest): Promise<Car>{
        
        const carExist= await this.carsRepository.findById(car_id);
        
        if(!carExist){
            throw new AppError("Car not Exists");
        }

        const specifications = await this.specificationRepository.findByIds(specification_id);


        carExist.specifications = specifications;

        await this.carsRepository.create(carExist)

        return carExist;

    }

}

export {CreateCarSpecificationUseCase}