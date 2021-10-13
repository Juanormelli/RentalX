
import{Request, Response} from "express"
import { container, inject, injectable } from "tsyringe"
import { ProfileUserUseCase } from "./ProfileUserUseCase"


class ProfileUserController{
    async handle(request: Request, response: Response): Promise<Response> {
        
        const {id }= request.user
        console.log("oi")
        const profileUserUseCase = container.resolve(ProfileUserUseCase)

        const user = await profileUserUseCase.execute(id)

        return response.json(user)


    }
}

export {ProfileUserController}