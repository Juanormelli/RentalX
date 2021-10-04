import { getRepository, Repository } from "typeorm";
import { ICreateUsersTokensDto } from "../../../../dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UsersToken } from "../entities/UserToken";



class UsersTokensRepository implements IUsersTokensRepository {
    private repository : Repository<UsersToken>

    constructor(){
        this.repository = getRepository(UsersToken)

    }
    
    
    
    
    async create({ user_id, expires_date, refresh_token }: ICreateUsersTokensDto): Promise<UsersToken> {
        const userToken = this.repository.create({
          user_id,
          expires_date,
          refresh_token,
        })

        await this.repository.save(userToken)

        return userToken
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
        const userTokens= await this.repository.findOne({user_id, refresh_token})

        return userTokens
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    findByRefreshToken(refresh_token: string): Promise<UsersToken> {
        const userToken = this.repository.findOne({refresh_token})

        return userToken
    }
    

}

export{UsersTokensRepository}