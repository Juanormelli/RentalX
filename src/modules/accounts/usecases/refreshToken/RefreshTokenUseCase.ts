import{sign, verify} from "jsonwebtoken"
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersTokensRepository } from "../../infra/typeorm/repositories/UsersTokensRepository";
import { RefreshTokenController } from "./RefreshTokenController";

interface IPayload {
    sub:string
    email:string
}


@injectable()
class RefreshTokenUseCase{
    
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository:UsersTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider:DayJsDateProvider,
    ){

    }
    async execute(token:string):Promise<string> {
        

        const {email,sub}=verify(token,auth.secret_refresh_token) as IPayload
        

        const user_id = sub

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

        if(!userToken){
            throw new AppError("Refresh Token does not exists")
        }

        await this.usersTokensRepository.deleteById(userToken.id)

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(auth.expires_refresh_token_days)

        const refresh_token = sign({email},auth.secret_refresh_token,{
            subject:user_id,
            expiresIn:auth.expires_in_refresh_token
        })

        const refreshNew =await this.usersTokensRepository.create({ 
            user_id,
            expires_date:refresh_token_expires_date,
            refresh_token
        })

        return refresh_token

    }



}

export{RefreshTokenUseCase}