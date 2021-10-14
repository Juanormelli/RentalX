"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailController = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordEmailUseCase = require("./SendForgotPasswordEmailUseCase");

class SendForgotPasswordMailController {
  async handle(request, response) {
    const {
      email
    } = request.body;

    const sendForgetPasswordMailUseCase = _tsyringe.container.resolve(_SendForgotPasswordEmailUseCase.SendForgotPasswordMailUseCase);

    await sendForgetPasswordMailUseCase.execute(email);
    return response.send();
  }

}

exports.SendForgotPasswordMailController = SendForgotPasswordMailController;