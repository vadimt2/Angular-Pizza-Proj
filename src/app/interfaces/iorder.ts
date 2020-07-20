import { IUser } from "./iuser";
import { IOrderDetails } from "./iorder-details";
import { IShipping } from "./ishipping";
import { IBellingAndShippInfo } from './ibelling-and-shipp-info';

export interface IOrder {
    id:number;
    orderDate:Date;
    shippingId:number;
    shipping:IShipping;
    userId:number;
    user:IUser;
    confirmationNumber:string;
    currencyString:string;
    currencyValue?:number;
    shippingCost:number;
    total:number;
    note:string;
    tax:number;
    bellingAndShippInfo:IBellingAndShippInfo[];
    OrderDetails:IOrderDetails[];
}
