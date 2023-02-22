import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardholderComponent } from './cardholder.component';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';

describe('CardholderComponent', () => {
  let component: CardholderComponent;
  let fixture: ComponentFixture<CardholderComponent>;
  const product:Product = new Product(1,'test',0.22);
  const products:Product[] = [product, product];
  let productServiceSpy:jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['getProducts']);
    productServiceSpy.getProducts.and.returnValue(of(products));
    await TestBed.configureTestingModule({
      declarations: [ CardholderComponent, TestCardComponent ],
      providers:[{provide:ProductService, useValue:productServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of products', ()=>{
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should display the products to the page', ()=>{
    let page:HTMLElement = fixture.nativeElement;
    
    expect(page.firstChild?.childNodes.length).toBeGreaterThanOrEqual(products.length);
  });
  @Component({
    selector: `app-card`,
    template: `<div>{{product.name}}</div>`
  })
  class TestCardComponent{
    @Input() product!:Product;
  }
});
