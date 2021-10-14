"use strict";

var _DayJsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _UserRepositoryInMemory = require("../../repositories/inmemory/UserRepositoryInMemory");

var _UsersTokenRepositoryInMemory = require("../../repositories/inmemory/UsersTokenRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let createUserUseCase;
let dayJsDateProvider;
describe("AuthenticateUser", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokensRepositoryInMemory();
    dayJsDateProvider = new _DayJsDateProvider.DayJsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayJsDateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to authenticate user ", async () => {
    const user = {
      name: "Teste",
      password: "Teste",
      driver_license: "000000",
      email: "Juan_ormelli@outlook.com"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("Should be not able to authenticate user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "Juan_ormelli@hotmail.com",
      password: "Teste"
    })).rejects.toEqual(new _AppError.AppError("User or password incorrect"));
  });
  it("Should not be Authenticate with wrong password", async () => {
    const user = {
      name: "Teste",
      password: "Teste",
      driver_license: "000000",
      email: "Juan_ormelli@outlook.com"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: "Juan_ormelli@outlook.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("User or password incorrect"));
  });
});