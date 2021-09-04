import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { SpecificationRepository } from "../../infra/typeorm/repositories/SpecificationRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository"
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";


interface IRequest{
    car_id: string;
    specification_id: string[];
}


class CreateCarSpecificationUseCase{
    constructor(
        private specificationRepository: ISpecificationRepository,
        private carsRepository:ICarsRepository
        ){

    }

    async execute({car_id, specification_id}:IRequest): Promise<Car>{

        const carExist= await this.carsRepository.findById(car_id);

        if(!carExist){
            throw new AppError("Car not Exists",400);
        }

        const specifications = await this.specificationRepository.findByIds(specification_id);


        carExist.specifications = specifications;

        await this.carsRepository.create(carExist)

        return carExist;

    }

}

export {CreateCarSpecificationUseCase}