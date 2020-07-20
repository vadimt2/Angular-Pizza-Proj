import { HttpHeaders } from '@angular/common/http';

export const environment = {
  apiUrl:"https://demo-pizza-api.herokuapp.com/api/",
  production: false,
  // apiUrl: "http://localhost:61307/api/"
};

export const endPoint = {
  items: "items",
  shipping: "shipping",
  order: "order",
  users:"users"
};


export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};