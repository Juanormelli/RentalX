import "reflect-metadata"

import{compare} from "bcrypt"
import { inject, injectable } from "tsyringe"
import { sign } from "jsonwebtoken"


import {IUserRepository} from "../repositories/IUserRepository"
import { AppError } from "../../../shared/errors/AppError"

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
}

@injectable()
class AuthenticateUserUseCase{
    constructor (
        @inject("UserRepository")
        private usersRepository:IUserRepository
){}

    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError("User or password incorrect",401)
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch){
            throw new AppError("User or password incorrect", 401)
        }

        const token = sign({},"33a8fa0298246379565f99494c5f9395",{
            subject: user.id,
            expiresIn: "1d"

        } )
        const tokenReturn :IResponse={
            token,
            user:{
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
        





    }
}

export {AuthenticateUserUseCase}