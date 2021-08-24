import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
  
    password,
    driver_license,
    email,
    avatar,
    id
  }): Promise<void> {
    const user = this.repository.create({
      name,
     
      password,
      driver_license,
      email,
      avatar,
      id
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User>{
    const user = await this.repository.findOne({email});

    return user
  }

  async findById(id: string): Promise<User>{

    const user = await this.repository.findOne({id})

    return user
  }
}

export { UserRepository };
