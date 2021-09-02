import { Car } from "../../infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarUsecase";

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory  

describe("Should be able to list all availables cars!",() => {


    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);

    })

    it("Should be able to list all available cars!",async () => {
        const car = await carsRepositoryInMemory.create({
            name:"308", 
            description:"Carro com espaço",
            daily_rate:150.00, 
            license_plate:"AdC-1234",
            fine_amount:100, 
            brand:"Peugeot", 
            category_id:"e80fd701-075c-4920-bb22-6b2dff5091aa"
        
        })


        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car])
    })

    it("Should be list all available cars by name!",async () => {
       
            const car = await carsRepositoryInMemory.create({
                name:"3008", 
                description:"Carro com espaço",
                daily_rate:150.00, 
                license_plate:"Add-1234",
                fine_amount:100, 
                brand:"Peugeot2", 
                category_id:"e80fd701-075c-4920-bb22-6b2dff5091aa"
            
            })
           
    
    
            const cars = await listCarsUseCase.execute({brand:"Peugeot2"});
            console.log (cars)

            expect(cars).toEqual([car])
        
    })
})