import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { UserRepository } from "../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;


    if (!authHeader){
        throw new AppError("Token Missing",401)
    }

    const [, token] = authHeader.split(" ")

    try{
        const {sub:user_id}= verify(token,"33a8fa0298246379565f99494c5f9395") as IPayload

        const usersRepository = new UserRepository();
        const user = await usersRepository.findById(user_id);
        if (!user){
            throw new AppError("User does note exists",401)
        }

        request.user = {
            id: user_id,
        }
        next();

    }
    catch{  
        throw new AppError("Invalid Token",401)

    }

}