import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm:any ={};
  success:boolean | undefined;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    //console.log(this.regForm);
    this.authService.register(this.regForm).subscribe(data=>this.success=data);
  }

}
