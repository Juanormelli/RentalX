import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { AppError } from "../../../../errors/AppError";
interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!",400);
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
