import { AppError } from "../../../../shared/errors/AppError";
import { Category } from "../../infra/typeorm/entities/Category"
import{CategoriesRepositoryInMemory} from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"


describe("Create Category",()=>{
    let createCategoryUseCase: CreateCategoryUseCase;
    let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

    beforeEach(()=>{
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)

    })

    it("Should create a category", async ()=>{
        const category = {
            name : "Create Category",
            description : "Teste"

        }
        
        await createCategoryUseCase.execute({
            name:category.name,
            description: category.description,
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty("id")
    })
    it("Should not be able create a category with same name", async ()=>{
        const category = {
            name : "Create Category",
            description : "Teste"

        }

        
        await createCategoryUseCase.execute({
            name:category.name,
            description: category.description,
        })
        
        expect(
           
            
            createCategoryUseCase.execute({
                name:category.name,
                description: category.description,
            })
        ).rejects.toEqual(new AppError("Category Already Exists"))

        

        
    })
})