"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationRepositoryInMemory = void 0;

var _Specification = require("../../infra/typeorm/entities/Specification");

class SpecificationRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    description,
    name
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    await this.specifications.push(specification);
    return specification;
  }

  async findByName(name) {
    return await this.specifications.find(specification => specification.name === name);
  }

  async findByIds(id) {
    const allSpecifications = await this.specifications.filter(specification => id.includes(specification.id));
    return allSpecifications;
  }

}

exports.SpecificationRepositoryInMemory = SpecificationRepositoryInMemory;