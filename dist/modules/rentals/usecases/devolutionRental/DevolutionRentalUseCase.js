"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IRentalsRepository = require("../../repository/IRentalsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayJsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalRepository, carsRepository, dataProvider) {
    this.rentalRepository = rentalRepository;
    this.carsRepository = carsRepository;
    this.dataProvider = dataProvider;
  }

  async execute({
    id,
    user_id
  }) {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minRentTime = 1;

    if (!rental) {
      throw new _AppError.AppError("Rental does not exist");
    }

    if (rental.end_date !== null) {
      throw new _AppError.AppError("Rental already closed");
    }

    const dateNow = this.dataProvider.dateNow();
    let daily = this.dataProvider.compareInDays(rental.start_date, this.dataProvider.dateNow());

    if (daily <= 0) {
      daily = minRentTime;
    }

    const delay = this.dataProvider.compareInDays(rental.expect_return_date, dateNow);
    let total = 0;
    console.log(delay);

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;
    rental.end_date = this.dataProvider.dateNow();
    rental.total = total;
    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;