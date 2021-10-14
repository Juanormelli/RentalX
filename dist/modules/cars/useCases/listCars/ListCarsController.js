"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListCarUsecase = require("./ListCarUsecase");

class ListCarsController {
  async handle(request, response) {
    const {
      brand,
      name,
      category_id
    } = request.query;

    const listCarsUseCase = _tsyringe.container.resolve(_ListCarUsecase.ListCarsUseCase);

    const cars = await listCarsUseCase.execute({
      brand: brand,
      name: name,
      category_id: category_id
    });
    console.log(cars);
    return response.json(cars);
  }

}

exports.ListCarsController = ListCarsController;