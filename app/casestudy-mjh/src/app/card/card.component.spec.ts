import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Product } from '../models/product';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const product:Product = new Product(1,'test',0.22);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput('product', product);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change order status', ()=>{
    let cur = component.ordered;

    component.order();

    expect(component.ordered).not.toBe(cur);
  });

  it('should display the product info', ()=>{
    let page:HTMLElement = fixture.nativeElement;
    
    expect(page.getElementsByTagName('p').length).toBeGreaterThan(0);
  });

  it('should display the ordered message', ()=>{
    let page:HTMLElement = fixture.nativeElement;
    let cur = page.getElementsByTagName('p').length
    
    component.ordered = true;
    fixture.detectChanges();

    expect(page.getElementsByTagName('p').length).toBeGreaterThan(cur);
  });

});
