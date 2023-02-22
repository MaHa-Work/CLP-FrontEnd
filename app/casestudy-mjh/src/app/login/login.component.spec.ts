import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { compileClassMetadata } from '@angular/compiler';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy:jasmine.SpyObj<AuthService>;
  const user:User = new User(1, 'test', 'test', 'test');
  const blankUser:User = new User(0,'','','');

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login', 'setUser']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{path: 'home', component: BlankComponent}]
      ),FormsModule],
      declarations: [ LoginComponent ],
      providers:[{provide:AuthService, useValue:authServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change registration states', ()=>{
    let cur:boolean = component.register;

    component.showReg();

    expect(cur).not.toBe(component.register)

    component.showReg();

    expect(cur).toBe(component.register);
  });

  it('should handle a successful login', ()=>{
    authServiceSpy.login.and.returnValue(of(user));
    authServiceSpy.setUser

    component.onSubmit();

    expect(component.success).toBe(undefined);
  });

  it('should handle a failed login', ()=>{
    authServiceSpy.login.and.returnValue(of(blankUser));
    authServiceSpy.setUser

    component.onSubmit();

    expect(component.success).toBe(false);
  });
  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{}
});


