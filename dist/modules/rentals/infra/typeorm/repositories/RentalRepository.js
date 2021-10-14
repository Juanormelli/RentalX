"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findOpenRentalByCarId(car_id) {
    return await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
  }

  async findOpenRentalByUser(user_id) {
    return await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
  }

  async create({
    car_id,
    expect_return_date,
    user_id,
    id,
    end_date,
    total
  }) {
    const rental = this.repository.create({
      car_id,
      expect_return_date,
      user_id,
      id,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }

  async findById(id) {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUserId(user_id) {
    const rentals = this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rentals;
  }

}

exports.RentalRepository = RentalRepository;