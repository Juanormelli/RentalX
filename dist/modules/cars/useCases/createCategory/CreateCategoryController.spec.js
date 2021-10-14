"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = require("../../../../shared/http/app");

var _uuid = require("uuid");

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS (id, name, email, password, driver_license, "isAdmin", created_at) 
            VALUES ('${id}','admin','admin@rentx.com.br','${password}','xxxxxxxxx','true','now()')`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should create a category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Teste Controller",
      description: "Teste 01"
    }).auth(responseToken.body.refresh_token, {
      type: 'bearer'
    });
    expect(response.status).toBe(201);
  });
  it("Should not be able to create a category with same name ", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Teste Controller",
      description: "Teste"
    }).auth(responseToken.body.refresh_token, {
      type: 'bearer'
    });
    expect(response.status).toBe(400);
  });
});