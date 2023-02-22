import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../models/user'

const httpOptions   = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  authURL:string = 'http://localhost:8080/auth'
  constructor(private http:HttpClient) { }

  login(credentials: {email:string; password:string}){
    let loginInfo = JSON.stringify(credentials);
    return this.http.post<User>(this.authURL+'/login', loginInfo, httpOptions);
  }

  register(credentials: {email:string; password:string, name:string}){
    let regInfo = JSON.stringify(credentials);
    return this.http.post<boolean>(this.authURL+'/register', regInfo, httpOptions);
  }

  setUser(user:User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser():User|null{
    
    let user = localStorage.getItem('user');
    if (user!=null) return JSON.parse(user); 
    return null;
  }
}
