import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import {v4 as uuidv4} from "uuid"


@Entity("users_tokens")
class UsersToken {

    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;


    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name:"user_id"})
    user: User;


    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;


    constructor(){
        if (!this.id ){
            this.id = uuidv4();
        }
    }
}



export{UsersToken}