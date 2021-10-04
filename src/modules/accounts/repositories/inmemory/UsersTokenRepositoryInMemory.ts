import { ICreateUsersTokensDto } from "../../../dtos/ICreateUsersTokensDTO";
import { UsersToken } from "../../infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



class UsersTokensRepositoryInMemory implements IUsersTokensRepository{
    usersTokens:UsersToken[] = []

    async create({ user_id, expires_date, refresh_token }: ICreateUsersTokensDto): Promise<UsersToken> {
        
        const userToken = new UsersToken()

        Object.assign(userToken,{
            expires_date,
            refresh_token,
            user_id,

        })

        this.usersTokens.push(userToken)

        return userToken
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
        const userToken = this.usersTokens.find(ut =>ut.user_id ===user_id && ut.refresh_token ===refresh_token )

        return userToken
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find(ut=>ut.id === id)
        this.usersTokens.splice(this.usersTokens.indexOf(userToken))
        
    }
    async findByRefreshToken(refresh_token: string): Promise<UsersToken> {
        const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token )

        return userToken
    }

}

export {UsersTokensRepositoryInMemory}