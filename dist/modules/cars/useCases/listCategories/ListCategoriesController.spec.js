"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = require("../../../../shared/http/app");

var _uuid = require("uuid");

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("List Categories", () => {
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
  it("should list categories", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Teste 01",
      description: "Teste 01"
    }).auth(responseToken.body.refresh_token, {
      type: "bearer"
    });
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Teste 02",
      description: "Teste 01"
    }).auth(responseToken.body.refresh_token, {
      type: "bearer"
    });
    const categories = await (0, _supertest.default)(_app.app).get("/categories");
    console.log(categories.body);
    expect(categories.status).toBe(200);
    expect(categories.body.length).toBe(2);
    expect(categories.body[0]).toHaveProperty("id");
    expect(categories.body[0].name).toEqual("Teste 01");
  });
});