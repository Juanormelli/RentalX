import { inject, injectable } from "tsyringe";
import {v4 as uuidV4} from "uuid"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherialMailProvider")
        private mailProvider:IMailProvider,
    ){}


    async execute(email:string):Promise<void>{

        const user = await this.usersRepository.findByEmail(email)

        if (!user){
            throw new AppError("Invalid e-mail!")
        }

        const token =uuidV4()

        const expires = this.dateProvider.addHours(3)

        await this.usersTokensRepository.create({
            user_id:user.id,
            refresh_token:token,
            expires_date:expires
        })

        await this.mailProvider.sendMail(email, "Recuperação de senha", token )



    }



 } 

 export {SendForgotPasswordMailUseCase}