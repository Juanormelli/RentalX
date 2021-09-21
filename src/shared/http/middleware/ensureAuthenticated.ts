import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { UserRepository } from "../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "../../../config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    const usersTokensRepository = new UsersTokensRepository()


    if (!authHeader){
        throw new AppError("Token Missing")
    }

    const [, token] = authHeader.split(" ")

    try{
        const {sub:user_id}= verify(token,auth.secret_refresh_token) as IPayload

        const usersRepository = new UserRepository();
        const user = await usersTokensRepository.findByUserIdAndRefreshToken(user_id,token);
        if (!user){
            throw new AppError("User does note exists")
        }

        request.user = {
            id: user_id,
        }
        next();

    }
    catch{  
        throw new AppError("Invalid Token")

    }

}