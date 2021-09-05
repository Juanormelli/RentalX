
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import{v4 as uuidV4} from 'uuid'


@Entity("cars_images")
class CarsImages{
    
    @PrimaryColumn()
    id:string

    @Column()
    car_id: string

    @Column()
    image_name: string

    @CreateDateColumn()
    created_at: Date
    
    constructor(){
        if(!this.id){
            this.id =uuidV4()
        }
    }

}

export {CarsImages}

