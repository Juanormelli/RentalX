import {Request, Response} from "express"
import { container } from "tsyringe"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordEmailUseCase"


class SendForgotPasswordMailController{

    async handle(request: Request, response: Response): Promise<Response>{
        const {email} = request.body

        const sendForgetPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase)

        await sendForgetPasswordMailUseCase.execute(email)
        return response.send()
    }


}

export {SendForgotPasswordMailController}