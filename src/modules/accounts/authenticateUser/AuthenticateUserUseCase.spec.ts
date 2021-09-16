import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../repositories/inmemory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../usecases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


let authenticateUserUseCase : AuthenticateUserUseCase
let usersRepositoryInMemory : UserRepositoryInMemory;
let createUserUseCase : CreateUserUseCase;

describe("AuthenticateUser",() => {

    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

    })
    it("Should be able to authenticate user ",async () => {
        const user :ICreateUserDTO = {
            name:"Teste",
  
            password:"Teste",
            driver_license:"000000",
            email:"Juan_ormelli@outlook.com",
            
        }
        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email:user.email,
            password:user.password
        })

        expect(result).toHaveProperty("token")
    })

    it("Should be not able to authenticate user",async ()=>{
        await expect(authenticateUserUseCase.execute({
                email:"Juan_ormelli@hotmail.com",
                password:"Teste"
            })
        ).rejects.toEqual(new AppError("User or password incorrect"))
    })
    it("Should not be Authenticate with wrong password", async ()=>{
        const user :ICreateUserDTO = {
            name:"Teste",
  
            password:"Teste",
            driver_license:"000000",
            email:"Juan_ormelli@outlook.com",
            
        }
        await createUserUseCase.execute(user)
        
        await expect(
            
            authenticateUserUseCase.execute({
                email:"Juan_ormelli@outlook.com",
                password:"1234"
            })

        ).rejects.toEqual(new AppError("User or password incorrect"))
    })
})