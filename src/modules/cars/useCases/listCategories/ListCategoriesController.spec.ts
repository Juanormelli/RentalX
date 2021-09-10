import request from "supertest";
import { app } from "../../../../shared/http/app";
import { v4 as uuidV4 } from "uuid";
import { Connection, createConnection } from "typeorm";
import { hash } from "bcryptjs";
import { Category } from "../../infra/typeorm/entities/Category";

let connection: Connection;

describe("List Categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, driver_license, "isAdmin", created_at) 
            VALUES ('${id}','admin','admin@rentx.com.br','${password}','xxxxxxxxx','true','now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should list categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    await request(app)
      .post("/categories")
      .send({
        name: "Teste 01",
        description: "Teste 01",
      })
      .auth(responseToken.body.token, { type: "bearer" });

    await request(app)
      .post("/categories")
      .send({
        name: "Teste 02",
        description: "Teste 01",
      })
      .auth(responseToken.body.token, { type: "bearer" });

    const categories = await request(app).get("/categories");

    console.log(categories.body);

    expect(categories.status).toBe(200);
    expect(categories.body.length).toBe(2);
    expect(categories.body[0]).toHaveProperty("id")
    expect(categories.body[0].name).toEqual("Teste 01")
  });
});
