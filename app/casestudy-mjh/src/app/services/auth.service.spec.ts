import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { of } from 'rxjs';
import { Component } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy:jasmine.SpyObj<HttpClient>;
  const user:User = new User(1, 'test', 'test', 'test');
  const blankUser:User = new User(0,'','','');

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['post']);
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue:httpClientSpy}]
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user from the db', () => {
    httpClientSpy.post.and.returnValue(of(user));
    let returnedUser:User = blankUser;

    service.login({email:'email', password:'password'}).subscribe(ret=>returnedUser=ret);

    expect(returnedUser.id).toBeGreaterThan(0);
    expect(returnedUser.name).toBeTruthy();
  });


  it ('should return the result of registration', ()=>{
    httpClientSpy.post.and.returnValue(of(true));
    let result = false;

    service.register({email:'email', password: 'password', name:'name'}).subscribe(ret=>result=ret);

    expect(result).toBe(true);
  })


  it('should save the user given a user', ()=>{
    expect(localStorage.getItem('user')).toBeFalsy();
    service.setUser(user);
    expect(localStorage.getItem('user')).toBeTruthy();
  });

  it('should return a set user', ()=>{
    localStorage.setItem('user', JSON.stringify(user));

    let result = service.getUser();

    expect(result).toBeTruthy();
  });

  it('should return null if user is not set', ()=>{
    let result = service.getUser();

    expect(result).toBe(null);
  });
});
