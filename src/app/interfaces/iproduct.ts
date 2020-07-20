import { ICategoryItems } from "./icategory-items";
import { IImages } from "./iimages";

export interface IProduct {
    id:number;
    price:number;
    title:string;
    currencyPrice:number;
    description:string;
    quantityInStock?:number;
    quantity?:number;
    available:boolean;
    discount?:number;
    categoryItems:ICategoryItems[];
    images:IImages[];
    total:number;
    parentItemId?:number;
    parentItem:IProduct
    subItem:IProduct[]
}
