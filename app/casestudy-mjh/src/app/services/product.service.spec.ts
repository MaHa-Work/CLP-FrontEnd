import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy:jasmine.SpyObj<HttpClient>;
  const product:Product = new Product(1,'test',0.22);
  const products:Product[] = [product, product];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient',['get']);
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue:httpClientSpy}]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get products from db', () => {
    httpClientSpy.get.and.returnValue(of(products));
    let returnedProducts:Product[] = [];

    service.getProducts().subscribe(ret => returnedProducts = ret);

    expect(returnedProducts.length).toBeGreaterThan(0);
  })
});
