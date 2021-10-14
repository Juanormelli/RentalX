"use strict";

var _DayJsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _MailProvidersInMemory = require("../../../../shared/container/providers/MailProvider/inmemory/MailProvidersInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _UserRepositoryInMemory = require("../../repositories/inmemory/UserRepositoryInMemory");

var _UsersTokenRepositoryInMemory = require("../../repositories/inmemory/UsersTokenRepositoryInMemory");

var _SendForgotPasswordEmailUseCase = require("./SendForgotPasswordEmailUseCase");

let sendForgotPasswordMail;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    dateProvider = new _DayJsDateProvider.DayJsDateProvider();
    mailProvider = new _MailProvidersInMemory.MailProviderInMemory();
    usersTokensRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokensRepositoryInMemory();
    sendForgotPasswordMail = new _SendForgotPasswordEmailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send email", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "666666",
      email: "teste@teste.com.br",
      name: "teste",
      password: "1234"
    });
    await sendForgotPasswordMail.execute("teste@teste.com.br");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not to be able to send email if user not exists", async () => {
    await expect(sendForgotPasswordMail.execute("Teste@teste.vbn.nn")).rejects.toEqual(new _AppError.AppError("Invalid e-mail!"));
  });
  it("should be able to create a users token", async () => {
    const generateToken = jest.spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "888887",
      email: "teste@teste2.com.br",
      name: "teste2",
      password: "1234"
    });
    await sendForgotPasswordMail.execute("teste@teste2.com.br");
    expect(generateToken).toHaveBeenCalled();
  });
});