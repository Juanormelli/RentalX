import { AppError } from "../../../../shared/errors/AppError"
import { Car } from "../../infra/typeorm/entities/Car"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory:CarsRepositoryInMemory

describe("Create Car", () => {
    
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })
    
    it ("Shold be create a new car", async () => {
        const car = await createCarUseCase.execute({
            name:"teste", 
            description:"teste", 
            daily_rate: 120, 
            license_plate: "abc123",
            fine_amount:102, 
            brand:"teste", 
            category_id:"category"
        })
        expect(car).toHaveProperty("id")
    })

    it("Should be not able to create a car when license plate alredy exist", async () => {
        expect (async () => {
            await createCarUseCase.execute({
                name:"teste", 
                description:"teste", 
                daily_rate: 120, 
                license_plate: "abc123",
                fine_amount:102, 
                brand:"teste", 
                category_id:"category"
            })
            await createCarUseCase.execute({
                name:"teste", 
                description:"teste", 
                daily_rate: 120, 
                license_plate: "abc123",
                fine_amount:102, 
                brand:"teste", 
                category_id:"category"
            })

        }).rejects.toBeInstanceOf(AppError)

    });

    it ("Should be able create a car avalable true by default", async () => {
        const car = await createCarUseCase.execute({
            name:"teste", 
            description:"teste", 
            daily_rate: 120, 
            license_plate: "abcd123",
            fine_amount:102, 
            brand:"teste", 
            category_id:"category"
        })
        expect(car.available).toBe(true)
    })
})