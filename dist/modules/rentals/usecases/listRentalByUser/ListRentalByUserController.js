"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalByUserController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalByUserUseCase = require("./ListRentalByUserUseCase");

class ListRentalByUserController {
  async handle(request, response) {
    const {
      id: user_id
    } = request.user;

    const listRentalByUserUseCase = _tsyringe.container.resolve(_ListRentalByUserUseCase.ListRentalByUserUseCase);

    const rentals = await listRentalByUserUseCase.execute(user_id);
    return response.status(200).json(rentals);
  }

}

exports.ListRentalByUserController = ListRentalByUserController;