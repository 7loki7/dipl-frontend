import { Component, OnInit } from '@angular/core';
import { UserCredentials } from './user.credentials.model';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {

  model : any={};    
  errorMessage:string;    
  constructor(private router:Router,private LoginService:LoginService,private toastr:ToastrService) { }    
    
    
  ngOnInit() {    
    sessionStorage.removeItem('UserName');    
    sessionStorage.clear();    
  }    
  login(){     
    this.LoginService.Login(this.model).subscribe(    
      data => {   
        debugger;
        if(data =="Success")    
        {       
          this.toastr.success("User logged in successfully", 'Logged in') 
          this.router.navigate(['/ExpenseDetail/']);     
        }    
        else{    
          this.toastr.error("Wrong username or password", 'Try Again')   
        }    
      },    
      error => {    
        this.errorMessage = error.message;    
      });    
  };  
  
  goBack(){
    setTimeout(()=>{                           
      this.router.navigate(['/']);    
  }, 500);
    
  }

}
