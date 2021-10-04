
import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import {hash} from "bcryptjs"
interface IRequest {
    token:string;
    password:string;
}
@injectable()
class ResetPasswordUserUseCase{
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository:IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider:IDateProvider,
        @inject("UserRepository")
        private usersRepository:IUserRepository
    ){}
    async execute( {password, token}: IRequest): Promise<void>{
         const userToken = await this.usersTokensRepository.findByRefreshToken(token);


         if (!userToken){
             throw new AppError("Token does not exists!")
         }

         if (this.dayJsDateProvider.compareIfBefore(userToken.expires_date, this.dayJsDateProvider.dateNow())){
             throw new AppError("Token expired")
         }

         const user = await this.usersRepository.findById(userToken.user_id)
         
         user.password = await hash(password, 8)

         await this.usersRepository.create(user)
         await this.usersTokensRepository.deleteById(userToken.id)

    }
}

export {ResetPasswordUserUseCase}