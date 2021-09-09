import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"


@Entity("rentals")
class Rental{
    @PrimaryColumn()
    id:string;

    @Column()
    car_id:string;;

    @Column()
    user_id:string;

    @CreateDateColumn()
    start_date:Date;

    @CreateDateColumn()
    end_date:Date;

    @CreateDateColumn()
    expect_return_date:Date

    @Column()
    total:number

    @Column()
    created_at:Date

    @Column()
    updated_at:Date


    constructor(){
        if (!this.id){
            this.id = uuidV4()
        }
    }

}

export {Rental}

