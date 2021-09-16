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
    
    it ("Should be create a new car", async () => {
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
        await createCarUseCase.execute({
            name:"teste", 
            description:"teste", 
            daily_rate: 120, 
            license_plate: "abc123",
            fine_amount:102, 
            brand:"teste", 
            category_id:"category"
        })
        
        await expect (
            createCarUseCase.execute({
                name:"teste", 
                description:"teste", 
                daily_rate: 120, 
                license_plate: "abc123",
                fine_amount:102, 
                brand:"teste", 
                category_id:"category"
            })

        ).rejects.toEqual(new AppError("Car Already exists!"))

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