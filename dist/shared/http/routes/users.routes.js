"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateUserController = require("../../../modules/accounts/usecases/createUser/CreateUserController");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

var _UpdateUserAvatarController = require("../../../modules/accounts/usecases/updateUserAvatar/UpdateUserAvatarController");

var _ProfileUserController = require("../../../modules/accounts/usecases/profileUser/ProfileUserController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
userRoutes.post("/", createUserController.handle);
userRoutes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
userRoutes.get("/profile", _ensureAuthenticated.ensureAuthenticated, profileUserController.handle);