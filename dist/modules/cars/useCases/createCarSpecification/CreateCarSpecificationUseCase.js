"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationUseCase = void 0;

var _AppError = require("../../../../shared/errors/AppError");

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _ISpecificationRepository = require("../../repositories/ISpecificationRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateCarSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationRepository.ISpecificationRepository === "undefined" ? Object : _ISpecificationRepository.ISpecificationRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCarSpecificationUseCase {
  constructor(specificationRepository, carsRepository) {
    this.specificationRepository = specificationRepository;
    this.carsRepository = carsRepository;
  }

  async execute({
    car_id,
    specification_id
  }) {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new _AppError.AppError("Car not Exists");
    }

    const specifications = await this.specificationRepository.findByIds(specification_id);
    carExist.specifications = specifications;
    await this.carsRepository.create(carExist);
    return carExist;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCarSpecificationUseCase = CreateCarSpecificationUseCase;