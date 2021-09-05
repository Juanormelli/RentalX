import { getRepository, Repository } from "typeorm";
import { ICarsImageRepository } from "../../../repositories/ICarsImageRepository";
import { CarsImages } from "../entities/CarImages";

class CarsImagesRepository implements ICarsImageRepository{
    private repository: Repository<CarsImages>

    constructor(){
        this.repository = getRepository(CarsImages)
    }


    async create(car_id: string, image_name: string): Promise<CarsImages> {

        const carImage = this.repository.create({
            car_id,
            image_name
        })

        await this.repository.save(carImage)

        return carImage
        
    }

}


export{CarsImagesRepository}