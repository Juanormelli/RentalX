import { ICreateUsersTokensDto } from "../../dtos/ICreateUsersTokensDTO";
import { UsersToken } from "../infra/typeorm/entities/UserToken";


interface IUsersTokensRepository{
    create({ user_id,
        expires_date,
        refresh_token}:ICreateUsersTokensDto): Promise<UsersToken>




}

export{IUsersTokensRepository} 