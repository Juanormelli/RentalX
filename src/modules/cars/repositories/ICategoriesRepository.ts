import { Category } from "../model/category";
interface ICreateCategory{
    name: string;
    description: string;
}
interface ICategoriesRepository{
    findByName(name: string):Category;
    list():Category[];
    create({name,description}:ICreateCategory):void;
}


export {ICategoriesRepository,ICreateCategory};