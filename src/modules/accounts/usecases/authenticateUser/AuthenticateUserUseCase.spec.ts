import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/inmemory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/inmemory/UsersTokenRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";



let authenticateUserUseCase : AuthenticateUserUseCase
let usersRepositoryInMemory : UserRepositoryInMemory;
let usersTokensRepositoryInMemory : UsersTokensRepositoryInMemory;
let createUserUseCase : CreateUserUseCase;
let dayJsDateProvider : DayJsDateProvider;

describe("AuthenticateUser",() => {

    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayJsDateProvider = new DayJsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory,
                                                            usersTokensRepositoryInMemory, 
                                                            dayJsDateProvider)
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