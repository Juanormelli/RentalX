import { inject, injectable } from "tsyringe";
import { ICarsImageRepository } from "../../repositories/ICarsImageRepository";


interface IRequest{
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImageRespository:ICarsImageRepository
    ){


    }
    async execute({car_id, images_name}: IRequest):Promise<void> {
        
        
        images_name.map(async (image)=>{
           await this.carsImageRespository.create(car_id, image);
            
        });

        

    }

}



export{UploadCarImageUseCase}