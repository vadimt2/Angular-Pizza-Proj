import { IRole } from '../interfaces/irole';
import { IOrder } from '../interfaces/iorder';
import { IUser } from '../interfaces/iuser';

export class User implements IUser {
    id:number;
    token:string;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    roleId :number;
    isRegistered:boolean;
    role:IRole;
    phone:string;
    orders:IOrder[];
}
