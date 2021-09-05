import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      specificationRepositoryInMemory, carsRepositoryInMemory
    );
  });

  it("Should not able to add a Specification to not exists Car", async () => {
    expect(async () => {
      const car_id = "123456";
      const specification_id = ["123"];

      await createCarSpecificationUseCase.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should able to add a Specification exists Car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "teste",
      description: "teste",
      daily_rate: 120,
      license_plate: "abc-123",
      fine_amount: 102,
      brand: "teste",
      category_id: "category",
    });

    const specification = await specificationRepositoryInMemory.create({ 
      name:"teste",
      description:"teste" 
    })

    const specification_id = [specification.id];

    
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specificationCars).toHaveProperty("specifications")
    expect(specificationCars.specifications.length).toBe(1)

  });
});
