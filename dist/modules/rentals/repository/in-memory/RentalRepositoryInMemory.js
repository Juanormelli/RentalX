"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalRepositoryInMemory = void 0;

var _Rental = require("../../infra/typeorm/entities/Rental");

class RentalRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  async findOpenRentalByCarId(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async create({
    user_id,
    car_id,
    expect_return_date
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      user_id,
      car_id,
      expect_return_date,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findById(id) {
    const rental = this.rentals.find(rental => rental.id === id);
    return rental;
  }

  async findByUserId(user_id) {
    const rentals = this.rentals.filter(rental => rental.user_id === user_id);
    return rentals;
  }

}

exports.RentalRepositoryInMemory = RentalRepositoryInMemory;