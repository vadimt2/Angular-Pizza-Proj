import { IOrder } from './iorder';
import { BellingOrShipping } from '../models';

export interface IBellingAndShippInfo {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    address:string;
    address2:string;
    state:string;
    country:string;
    zip?:number;
    bellingOrShipping:BellingOrShipping;
    isTheSame:boolean;
  // for registered users only!
    isSaved:boolean;
    orderId:number;
    order:IOrder;
}


