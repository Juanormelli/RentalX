import { getRepository, Repository } from "typeorm";

import { Specification } from "../entities/Specification";

import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "../../../repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }
  

  /*public static getInstance(){
        if (!SpecificationRepository.INSTANCE){
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        return SpecificationRepository.INSTANCE;
    }*/

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name });
    return specification;
  }
  async findByIds(id: string[]): Promise<Specification[]> {
    
  }
}

export { SpecificationRepository };
