import "reflect-metadata"

import{compare} from "bcryptjs"
import { inject, injectable } from "tsyringe"
import { sign } from "jsonwebtoken"


import {IUserRepository} from "../../repositories/IUserRepository"
import { AppError } from "../../../../shared/errors/AppError"
import { UsersTokensRepository } from "../../infra/typeorm/repositories/UsersTokensRepository"
import auth from "../../../../config/auth"
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"

interface IRequest{
    email: string;
    password: string;

}
interface IResponse{
    user:{
        name: string;
        email: string;
    },
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase{
    constructor (
        @inject("UserRepository")
        private usersRepository:IUserRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository:IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider:DayJsDateProvider
){}

    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError("User or password incorrect")
        }

        const{expires_in_token, secret_token, secret_refresh_token, expires_in_refresh_token,expires_refresh_token_days} = auth

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch){
            throw new AppError("User or password incorrect")
        }

        const token = sign({},secret_token,{
            subject: user.id,
            expiresIn: expires_in_token

        } )

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(expires_refresh_token_days)

        const refresh_token = sign({email},secret_refresh_token,{
            subject:user.id,
            expiresIn: expires_in_refresh_token

        })

        await this.usersTokensRepository.create({
            user_id:user.id,
            expires_date:refresh_token_expires_date,
            refresh_token
        })
        const tokenReturn :IResponse={
            token,
            user:{
                name: user.name,
                email: user.email
            },
            refresh_token,
        }

        return tokenReturn
        





    }
}

export {AuthenticateUserUseCase}