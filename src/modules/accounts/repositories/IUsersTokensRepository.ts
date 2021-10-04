import { ICreateUsersTokensDto } from "../../dtos/ICreateUsersTokensDTO";
import { UsersToken } from "../infra/typeorm/entities/UserToken";


interface IUsersTokensRepository{
    create({ user_id,
        expires_date,
        refresh_token}:ICreateUsersTokensDto): Promise<UsersToken>

    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken>
    
    deleteById(id: string): Promise<void>

    findByRefreshToken(refresh_token: string): Promise<UsersToken>



}

export{IUsersTokensRepository} 