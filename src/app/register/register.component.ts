import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'
import { LoginService } from '../login/login.service';    
import {Register} from '../register';   
import {Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./style.css']
})
export class RegisterComponent implements OnInit {
  
  data = false;    
  UserForm: any;    
  massage:string;    
  constructor(private router: Router, private formbulider: FormBuilder,private loginService:LoginService,private toastr:ToastrService) { }    
    
  ngOnInit() {    
    this.UserForm = this.formbulider.group({    
      Name: ['', [Validators.required]],    
      Surname: ['', [Validators.required]],    
      Username: ['', [Validators.required]],    
      Password: ['', [Validators.required]],    
      Email: ['', [Validators.required]],      
    });    
  }    
   onFormSubmit()    
  {    
    const user = this.UserForm.value;    
    this.Createemployee(user);    
  }    
  Createemployee(register:Register){
             this.loginService.CreateUser(register).subscribe(    
                ()=>    
                    {    
                      this.data = true;    
                      this.massage = 'Data saved Successfully';
                      this.toastr.success("User added successfully", 'Registered') 
                      this.UserForm.reset();
                      this.router.navigate(['/login']);
                    });    
  } 

}
