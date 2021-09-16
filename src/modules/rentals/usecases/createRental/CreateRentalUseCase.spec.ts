import dayjs from "dayjs";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepository } from "../../../cars/infra/typeorm/repositories/CarsRepository";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "../../repository/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalRepositoryInMemory;
let dateProvider: DayJsDateProvider 
let carsRepository : CarsRepositoryInMemory 

describe("Create Rentals", () => {
const dayAdd24 = dayjs().add(1,"day").toDate()
  beforeEach(() => {
    rentalsRepository = new RentalRepositoryInMemory();
    dateProvider = new DayJsDateProvider()
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository,dateProvider, carsRepository);
  });

  it("Should be able to create a new Rentals", async () => {
    const car = await carsRepository.create({
      name:"3008", 
	    description:"Carro com espaço",
	    daily_rate:150.00, 
	    license_plate:"AbC-1234",
	    fine_amount:100, 
	    brand:"Peugeot", 
	    category_id:"183d4ce6-36f5-4df7-8193-9087b5951388"
    })
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expect_return_date: dayAdd24,
    });

    console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new Rentals, if there is another open to the same user", async () => {
    const car = await carsRepository.create({
      name:"3008", 
	    description:"Carro com espaço",
	    daily_rate:150.00, 
	    license_plate:"AbC-1234",
	    fine_amount:100, 
	    brand:"Peugeot", 
	    category_id:"183d4ce6-36f5-4df7-8193-9087b5951388"
    })
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expect_return_date: dayAdd24,
    })
    await expect(
      

      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "testee",
        expect_return_date: dayAdd24,
      })

    ).rejects.toEqual(new AppError("User have another rental open"));
  });
  it("Should not be able to create a new Rentals, if there is another open to the same car", async () => {
    const car = await carsRepository.create({
      id:"123",
      name:"3008", 
	    description:"Carro com espaço",
	    daily_rate:150.00, 
	    license_plate:"Abmm-1234",
	    fine_amount:100, 
	    brand:"Peugeot", 
	    category_id:"183d4ce6-36f5-4df7-8193-9087b5951388"
    })
    
    await createRentalUseCase.execute({
      user_id: "321455",
      car_id: car.id,
      expect_return_date: dayAdd24,
    });


    await expect(
      createRentalUseCase.execute({
        user_id: "125444",
        car_id: car.id,
        expect_return_date: dayAdd24,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });


  it("Should not be able to create a new Rentals, if the rent time is under 24 hours", async () => {
      
    await expect(
       createRentalUseCase.execute({
        user_id: "3214556",
        car_id: "1234",
        expect_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError("The rent minimum time is 24 hours"));
  });
});
