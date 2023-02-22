import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy:jasmine.SpyObj<AuthService>;


  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService',['register']);
    
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ RegisterComponent ],
      providers: [{provide:AuthService, useValue:authServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message on success', () => {
    authServiceSpy.register.and.returnValue(of(true));

    let page:HTMLElement = fixture.nativeElement;
    expect(page.getElementsByTagName('h3')[0]).toBeFalsy()

    component.onSubmit()
    fixture.detectChanges()
    
    expect(page.getElementsByTagName('h3')[0]).toBeTruthy()
    expect(page.getElementsByTagName('h3')[0].innerHTML).toContain('SUCCESS')
  })

  it('should display message on failure', () => {
    authServiceSpy.register.and.returnValue(of(false));

    let page:HTMLElement = fixture.nativeElement;
    expect(page.getElementsByTagName('h3')[0]).toBeFalsy()

    component.onSubmit()
    fixture.detectChanges()
    
    expect(page.getElementsByTagName('h3')[0]).toBeTruthy()
    expect(page.getElementsByTagName('h3')[0].innerHTML).toContain('registered')
  })
});
