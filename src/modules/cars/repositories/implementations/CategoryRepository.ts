import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/Category';
import { ICreateCategory,ICategoriesRepository } from '../ICategoriesRepository';



class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>
    //private static INSTANCE: CategoriesRepository
    constructor(){
        this.repository = getRepository(Category);
    }
    
    /*public static getInstance(): CategoriesRepository{
        if (!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();

        }
        return CategoriesRepository.INSTANCE;
    }*/


    async create({description, name}:ICreateCategory):Promise<void> {
        const category = this.repository.create({
            description,
            name
        });

       
    
        await this.repository.save(category)
    }

    async list():Promise<Category[]>{
        const categories = this.repository.find()
        return categories;
    }

    async findByName(name:string):Promise<Category>{
        const category = this.repository.findOne({ name })
        return category
    }
}


export {CategoriesRepository};