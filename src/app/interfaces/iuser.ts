import { IRole } from "./irole";
import { IOrder } from "./iorder";

export interface IUser {
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
