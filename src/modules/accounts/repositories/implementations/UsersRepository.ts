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
    username,
    password,
    driver_license,
    email,
  }): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      driver_license,
      email,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
