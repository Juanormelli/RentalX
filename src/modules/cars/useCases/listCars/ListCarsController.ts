import {Request, Response} from "express"
import { container } from "tsyringe"
import { ListCarsUseCase } from "./ListCarUsecase"






class ListCarsController{
   async handle(request: Request, response: Response):Promise<Response>{
        const {brand, name,category_id}= request.query
        console.log("Aqui")
       const listCarsUseCase = container.resolve(ListCarsUseCase)
       console.log("Aqui")

       const cars = await listCarsUseCase.execute({
            brand:brand as string,
            name:name as string,
            category_id:category_id as string
        })
        console.log(cars)
        return response.json(cars)
   }
}


export {ListCarsController}