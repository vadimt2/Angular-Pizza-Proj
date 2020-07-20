import { ICategory } from "./icategory";
import { IProduct } from "./iproduct";

export interface ICategoryItems {
    id:number; 

    categoryId:number;  


    category:ICategory;


    itemId:number; 


    item:IProduct; 
}

