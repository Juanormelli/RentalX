import { RentalRepositoryInMemory } from "../../repository/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";


let createRentalUseCase : CreateRentalUseCase;
let rentalsRepository: RentalRepositoryInMemory;


describe("Create Rentals", () => {

    beforeEach(() => {
        rentalsRepository = new RentalRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
    })

    it ("Should be able to create a new Rentals", async () => {

        await createRentalUseCase.execute({
            user_id:"1234",
            car_id:"1234",
            expect_return_date:new Date()
        })
    })

})