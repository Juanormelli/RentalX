import request from "supertest";
import { app } from "../../../../shared/http/app";
import {v4 as uuidV4} from "uuid";
import {Connection, createConnection} from "typeorm"
import { hash } from "bcryptjs";

let connection : Connection

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations()

        const id = uuidV4()
        const password = await hash("admin",8)


        await connection.query(
            `INSERT INTO USERS (id, name, email, password, driver_license, "isAdmin", created_at) 
            VALUES ('${id}','admin','admin@rentx.com.br','${password}','xxxxxxxxx','true','now()')`
        )
    })
    
    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })
  
    it("should create a category", async () => {
    const responseToken = await request(app).post("/sessions").send({
        email:"admin@rentx.com.br",
        password:"admin"
    })

    const response = await request(app).post("/categories").send({
      name: "Teste Controller",
      description: "Teste 01",
    }).auth(responseToken.body.refresh_token,{type: 'bearer'} );

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a category with same name ", async () => {
    const responseToken = await request(app).post("/sessions").send({
        email:"admin@rentx.com.br",
        password:"admin"
    })

    
    
    const response = await request(app).post("/categories").send({
      name: "Teste Controller",
      description: "Teste",
    }).auth(responseToken.body.refresh_token,{type: 'bearer'} );

    expect(response.status).toBe(400);
  });


});
