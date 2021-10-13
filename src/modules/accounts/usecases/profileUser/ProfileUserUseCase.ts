import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../../../dtos/IUserResponseDTO";
import { User } from "../../infra/typeorm/entities/User";
import { UserMap } from "../../mapper/UserMap";
import { IUserRepository } from "../../repositories/IUserRepository";






@injectable()
class ProfileUserUseCase{
    constructor(
        @inject("UserRepository")
        private usersRepository:IUserRepository
    ){}



    async execute(id:string): Promise<IUserResponseDTO>{
        const user = await this.usersRepository.findById(id)
        return UserMap.toDTO(user)
    }
}

export{ProfileUserUseCase}