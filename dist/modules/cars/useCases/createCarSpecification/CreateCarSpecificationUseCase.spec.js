"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationRepositoryInMemory = require("../../repositories/in-memory/SpecificationRepositoryInMemory");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new _SpecificationRepositoryInMemory.SpecificationRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(specificationRepositoryInMemory, carsRepositoryInMemory);
  });
  it("Should not able to add a Specification to not exists Car", async () => {
    expect(async () => {
      const car_id = "123456";
      const specification_id = ["123"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specification_id
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it("Should able to add a Specification exists Car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "teste",
      description: "teste",
      daily_rate: 120,
      license_plate: "abc-123",
      fine_amount: 102,
      brand: "teste",
      category_id: "category"
    });
    const specification = await specificationRepositoryInMemory.create({
      name: "teste",
      description: "teste"
    });
    const specification_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id
    });
    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});