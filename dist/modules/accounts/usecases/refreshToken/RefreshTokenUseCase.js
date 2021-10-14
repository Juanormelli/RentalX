"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _DayJsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersTokensRepository = require("../../infra/typeorm/repositories/UsersTokensRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayJsDateProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UsersTokensRepository.UsersTokensRepository === "undefined" ? Object : _UsersTokensRepository.UsersTokensRepository, typeof _DayJsDateProvider.DayJsDateProvider === "undefined" ? Object : _DayJsDateProvider.DayJsDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(usersTokensRepository, dayJsDateProvider) {
    this.usersTokensRepository = usersTokensRepository;
    this.dayJsDateProvider = dayJsDateProvider;
  }

  async execute(token) {
    const {
      email,
      sub
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_refresh_token);
    const user_id = sub;
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new _AppError.AppError("Refresh Token does not exists");
    }

    await this.usersTokensRepository.deleteById(userToken.id);
    const refresh_token_expires_date = this.dayJsDateProvider.addDays(_auth.default.expires_refresh_token_days);
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: user_id,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    await this.usersTokensRepository.create({
      user_id,
      expires_date: refresh_token_expires_date,
      refresh_token
    });
    const newToken = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user_id,
      expiresIn: _auth.default.expires_in_token
    });
    return {
      refresh_token,
      token: newToken
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;