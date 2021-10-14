"use strict";

var _tsyringe = require("tsyringe");

require("reflect-metadata");

require("./providers");

var _CategoryRepository = require("../../modules/cars/infra/typeorm/repositories/CategoryRepository");

var _SpecificationRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationRepository");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CarsImagesRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImagesRepository");

var _RentalRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalRepository");

var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

_tsyringe.container.registerSingleton("CategoriesRepository", _CategoryRepository.CategoriesRepository);

_tsyringe.container.registerSingleton("SpecificationRepository", _SpecificationRepository.SpecificationRepository);

_tsyringe.container.registerSingleton("UserRepository", _UsersRepository.UserRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImagesRepository", _CarsImagesRepository.CarsImagesRepository);

_tsyringe.container.registerSingleton("RentalRepository", _RentalRepository.RentalRepository);

_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository); //container.registerSingleton<IRentalsRepository>("DevolutionRepository", Repository)