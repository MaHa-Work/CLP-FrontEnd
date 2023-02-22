
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  prodURL:string = 'http://localhost:8080/products';
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.prodURL);
  }


}
