import {CategoriesRepository} from "../../repositories/implementations/CategoryRepository"
import {ListCategoriesUseCase} from "./ListCategoriesUseCase"
import {ListCategoriesController} from "./ListCategoriesController"


const categoryRepository = CategoriesRepository.getInstance();

const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);

const listCategoriesControllers = new ListCategoriesController(listCategoriesUseCase)


export{listCategoriesControllers}