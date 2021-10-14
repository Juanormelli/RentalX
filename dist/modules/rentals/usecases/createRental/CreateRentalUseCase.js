"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IRentalsRepository = require("../../repository/IRentalsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayJsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalsRepository, dataProvider, carsRepository) {
    this.rentalsRepository = rentalsRepository;
    this.dataProvider = dataProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    user_id,
    car_id,
    expect_return_date
  }) {
    const carsUnAvailable = await this.rentalsRepository.findOpenRentalByCarId(car_id);
    const minRentTime = 24;

    if (carsUnAvailable) {
      throw new _AppError.AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new _AppError.AppError("User have another rental open");
    }

    const compare = await this.dataProvider.compare(this.dataProvider.dateNow(), expect_return_date);
    console.log(compare);

    if (compare < minRentTime) {
      throw new _AppError.AppError("The rent minimum time is 24 hours");
    }

    const rent = await this.rentalsRepository.create({
      user_id,
      car_id,
      expect_return_date
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rent;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;