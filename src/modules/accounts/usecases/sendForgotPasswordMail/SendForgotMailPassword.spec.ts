import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider"
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/inmemory/MailProvidersInMemory"
import { AppError } from "../../../../shared/errors/AppError"
import { UserRepositoryInMemory } from "../../repositories/inmemory/UserRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/inmemory/UsersTokenRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordEmailUseCase"


let sendForgotPasswordMail:SendForgotPasswordMailUseCase
let usersRepositoryInMemory : UserRepositoryInMemory
let dateProvider:DayJsDateProvider
let usersTokensRepositoryInMemory:UsersTokensRepositoryInMemory
let mailProvider : MailProviderInMemory


describe("Send Forgot Mail",() => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory()
        dateProvider=new DayJsDateProvider()
        mailProvider = new MailProviderInMemory()
        usersTokensRepositoryInMemory= new UsersTokensRepositoryInMemory()


        sendForgotPasswordMail = new SendForgotPasswordMailUseCase( usersRepositoryInMemory,usersTokensRepositoryInMemory,dateProvider,mailProvider);

    })


    it("Should be able to send email", async () => {
        const sendMail=jest.spyOn(mailProvider,"sendMail")
        await usersRepositoryInMemory.create({ 
            driver_license:"666666",
            email:"teste@teste.com.br",
            name:"teste",
            password:"1234"
        })
        await sendForgotPasswordMail.execute("teste@teste.com.br")

        expect(sendMail).toHaveBeenCalled()



    })
    it("Should not to be able to send email if user not exists",async ()=>{
        await expect(
            sendForgotPasswordMail.execute("Teste@teste.vbn.nn")
        ).rejects.toEqual(new AppError("Invalid e-mail!"))
    })

    it("should be able to create a users token", async ()=>{
        const generateToken = jest.spyOn(usersTokensRepositoryInMemory,"create")

        usersRepositoryInMemory.create({
            driver_license:"888887",
            email:"teste@teste2.com.br",
            name:"teste2",
            password:"1234"
        })

        await sendForgotPasswordMail.execute("teste@teste2.com.br")

        expect(generateToken).toHaveBeenCalled()
    })
})