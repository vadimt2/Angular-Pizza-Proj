import { IOrder } from "./iorder";
import { IProduct } from "./iproduct";

export interface IOrderDetails {
    id:number;
    orderId:number;
    order:IOrder;
    itemId:number; 
    item:IProduct;
  // Item will have a price at the item and a sell price here
    sellPrice:number; 
  // Quantity that will be sold
    quantity:number;
}
