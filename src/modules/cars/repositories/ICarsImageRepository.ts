import { CarsImages } from "../infra/typeorm/entities/CarImages";


interface ICarsImageRepository {

    create(car_id: string, image_name: string):Promise<CarsImages>;


}

export {ICarsImageRepository}
