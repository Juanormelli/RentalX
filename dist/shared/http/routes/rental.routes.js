"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _express = require("express");

var _CreateRentalController = require("../../../modules/rentals/usecases/createRental/CreateRentalController");

var _DevolutionRentalController = require("../../../modules/rentals/usecases/devolutionRental/DevolutionRentalController");

var _ListRentalByUserController = require("../../../modules/rentals/usecases/listRentalByUser/ListRentalByUserController");

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalByUserController = new _ListRentalByUserController.ListRentalByUserController();
rentalRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", _ensureAuthenticated.ensureAuthenticated, listRentalByUserController.handle);