"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("../entities/Specification");

class SpecificationRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specification.Specification);
  }
  /*public static getInstance(){
        if (!SpecificationRepository.INSTANCE){
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        return SpecificationRepository.INSTANCE;
    }*/


  async create({
    description,
    name
  }) {
    const specification = this.repository.create({
      name,
      description
    });
    await this.repository.save(specification);
    return specification;
  }

  async findByName(name) {
    const specification = this.repository.findOne({
      name
    });
    return specification;
  }

  async findByIds(id) {
    const specification = this.repository.findByIds(id);
    return specification;
  }

}

exports.SpecificationRepository = SpecificationRepository;