"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

class UserRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async create({
    name,
    password,
    driver_license,
    email,
    avatar,
    id
  }) {
    const user = this.repository.create({
      name,
      password,
      driver_license,
      email,
      avatar,
      id
    });
    await this.repository.save(user);
  }

  async findByEmail(email) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }

  async findById(id) {
    const user = await this.repository.findOne({
      id
    });
    return user;
  }

}

exports.UserRepository = UserRepository;