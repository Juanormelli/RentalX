import { isDebuggerStatement, isIdentifierStart } from "typescript";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { SpecificationRepository } from "../../infra/typeorm/repositories/SpecificationRepository";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";




class SpecificationRepositoryInMemory implements ISpecificationRepository{
    specifications :Specification [] = []
    
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification =new Specification()
        
        
        Object.assign(specification,{
            name,
            description,
        })

        await this.specifications.push(specification)
        
        return specification

    }
    async findByName(name: string): Promise<Specification> {
        return await this.specifications.find((specification) =>specification.name === name)
    }
    async findByIds(id: string[]): Promise<Specification[]> {
        const allSpecifications = await this.specifications.filter((specification)=>id.includes(specification.id))

        return allSpecifications
    }

}

export{SpecificationRepositoryInMemory}