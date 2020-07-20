import { Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { environment, endPoint } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:IProduct[] = null;

  constructor(private http: HttpClient) { 
  }

  get():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${environment.apiUrl}${endPoint.items}`);
  }

  getById(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(`${environment.apiUrl}${endPoint.items}/${id}`);
  }

  inseret(product:IProduct):Observable<IProduct>{
    return this.http.post<IProduct>(`${environment.apiUrl}${endPoint.items}`, product);
  }

  delete(product:IProduct):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}${endPoint.items}`,product);
  }

  update(product:IProduct):Observable<IProduct>{
    return this.http.put<IProduct>(`${environment.apiUrl}${endPoint.items}`, product);
  }
}