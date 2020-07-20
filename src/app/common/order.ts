import { IOrderDetails } from '../interfaces/iorder-details';
import { IUser } from '../interfaces/iuser';
import { IShipping } from '../interfaces/ishipping';
import { BellingAndShippInfo } from './belling-and-shipp-info';

export class Order {
    id: number;
    orderDate: Date;
    shippingId: number;
    shipping: IShipping;
    userId: number;
    user: IUser;
    confirmationNumber: string;
    currencyString:string;
    currencyValue?:number;
    shippingCost:number;
    total: number;
    note: string;
    tax: number;
    bellingAndShippInfo: BellingAndShippInfo[];
    OrderDetails: IOrderDetails[];
}
