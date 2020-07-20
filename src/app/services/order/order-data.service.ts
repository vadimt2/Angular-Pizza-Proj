import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  tempCartInfo = null

  constructor() { }

  saveCartInfo(tempCartInfo){
    this.tempCartInfo = tempCartInfo;
  }

}
