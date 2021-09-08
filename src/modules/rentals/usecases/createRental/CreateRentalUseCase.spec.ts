import dayjs from "dayjs";

import { AppError } from "../../../../shared/errors/AppError";
import { RentalRepositoryInMemory } from "../../repository/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalRepositoryInMemory;

describe("Create Rentals", () => {
const dayAdd24 = dayjs().add(1,"day").toDate()
  beforeEach(() => {
    rentalsRepository = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });

  it("Should be able to create a new Rentals", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "1234",
      expect_return_date: dayAdd24,
    });

    console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new Rentals, if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1234",
        expect_return_date: dayAdd24,
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1234",
        expect_return_date: dayAdd24,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to create a new Rentals, if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "321455",
        car_id: "1234",
        expect_return_date: dayAdd24,
      });

      await createRentalUseCase.execute({
        user_id: "125444",
        car_id: "1234",
        expect_return_date: dayAdd24,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to create a new Rentals, if the rent time is under 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "3214556",
        car_id: "1234",
        expect_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
