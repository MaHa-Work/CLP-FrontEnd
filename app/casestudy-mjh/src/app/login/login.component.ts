import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register:boolean = false;
  loginForm:any = {};
  success:boolean | undefined;
  constructor(private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('user');
    
  }

  showReg(): void{
    this.register=!this.register;
    
  }

  onSubmit(){
    //console.log(this.loginForm);
    this.authService.login(this.loginForm).subscribe(
      data =>{if (data.name) {
        this.authService.setUser(data);
        this.router.navigate(['home'])
      } else {
        this.success = false
      }}) 
  }
}
