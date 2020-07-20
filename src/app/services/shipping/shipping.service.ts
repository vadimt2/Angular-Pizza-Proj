import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IShipping } from '../../interfaces/ishipping';
import { Observable } from 'rxjs';
import { environment, endPoint } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) { }


  get():Observable<IShipping[]>{
    return this.http.get<IShipping[]>(`${environment.apiUrl}${endPoint.shipping}`);
  }

  getById(id:number):Observable<IShipping>{
    return this.http.get<IShipping>(`${environment.apiUrl}${endPoint.shipping}${id}`);
  }

  inseret(shipping:IShipping):Observable<IShipping>{
    return this.http.post<IShipping>(`${environment.apiUrl}${endPoint.shipping}`, shipping);
  }

  delete(id:number):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}${endPoint.shipping}`,id);
  }

  update(shipping:IShipping):Observable<IShipping>{
    return this.http.put<IShipping>(`${environment.apiUrl}${endPoint.shipping}`, shipping);
  }
}