import { IOrder } from '../interfaces/iorder';
import { BellingOrShipping } from './belling-or-shipping.enum';

export class BellingAndShippInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    address2: string;
    state: string;
    country: string;
    zip?: number;
    bellingOrShipping: BellingOrShipping;
    isTheSame: boolean;
    isSaved: boolean;
    orderId: number;
    order: IOrder;
}

