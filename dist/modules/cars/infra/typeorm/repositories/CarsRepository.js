"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailable(brand, category_id, name) {
    const carQuery = this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (brand) {
      carQuery.andWhere("c.brand = :brand", {
        brand: brand
      });
    }

    if (name) {
      carQuery.andWhere("c.name = :name", {
        name: name
      });
    }

    if (category_id) {
      carQuery.andWhere("c.category_id = :category_id", {
        category_id: category_id
      });
    }

    const cars = await carQuery.getMany();
    return cars;
  }

  async findById(id) {
    return await this.repository.findOne({
      id
    });
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;