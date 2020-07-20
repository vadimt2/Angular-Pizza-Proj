import { IProduct } from "./iproduct";

export interface IImages {
    id:number;
    imageData:string;
    isUrl:boolean;
    itemId:number;
    item:IProduct[];
}
