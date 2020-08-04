import { IProduct } from '../interfaces/iproduct';
import { IOrder } from '../interfaces/iorder';

export class OrderDetails {
    id: number;
    orderId: number;
    order: IOrder;
    itemId: number;
    item: IProduct;
    sellPrice: number;
    quantity: number;
}
