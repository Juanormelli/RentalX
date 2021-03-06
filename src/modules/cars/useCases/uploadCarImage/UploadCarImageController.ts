import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";
import{Request, Response} from "express"

interface IFiles{
    filename:string
}


class UploadCarImageController{


    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const images = request.files as IFiles[]; 

        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

        const filenames= images.map((file) => file.filename)

        await uploadCarImageUseCase.execute({car_id: id,images_name:filenames})

        return response.status(201).send()

    }

}

export{UploadCarImageController}