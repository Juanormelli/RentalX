import { container } from "tsyringe";
import "reflect-metadata";
import "../container/providers"
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoryRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImageRepository } from "../../modules/cars/repositories/ICarsImageRepository";
import { CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { IRentalsRepository } from "../../modules/rentals/repository/IRentalsRepository";
import { RentalRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)

container.registerSingleton<ICarsImageRepository>("CarsImagesRepository", CarsImagesRepository)

container.registerSingleton<IRentalsRepository>("RentalRepository", RentalRepository)

container.registerSingleton<IUsersTokensRepository>("UsersTokensRepository", UsersTokensRepository)


//container.registerSingleton<IRentalsRepository>("DevolutionRepository", Repository)

