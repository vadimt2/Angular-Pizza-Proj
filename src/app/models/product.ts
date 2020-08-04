import { IProduct } from '../interfaces/iproduct';
import { ICategoryItems } from '../interfaces/icategory-items';
import { IImages } from '../interfaces/iimages';

export class Product implements IProduct {
    id: number;
    price: number;
    title: string;
    currencyPrice: number;
    description: string;
    quantityInStock?: number;
    quantity?: number;
    available: boolean;
    discount?: number;
    categoryItems:ICategoryItems[];
    images: IImages[];
    total: number;
    parentItemId?: number;
    parentItem: IProduct;
    subItem: IProduct[];
}
