import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import {hash} from "bcrypt"
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({
    name,
    password,
    driver_license,
    email,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError("User Already Exists",401)
    }

    const passwordhash = await hash(password,8) 
    await this.usersRepository.create({
      name,
      password: passwordhash,
      driver_license,
      email,
    });
  }
}

export { CreateUserUseCase };
