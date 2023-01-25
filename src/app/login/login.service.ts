import { Injectable } from '@angular/core';
import { UserCredentials } from './user.credentials.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from "../register"; 


@Injectable({
  providedIn: 'root'
})
export class LoginService {

        Url : string;
        token : string;
        header :any;

  constructor( private http: HttpClient)
   { 
      this.Url = 'http://localhost:45500/api';
      const headerSettings : {[name: string]:string | string[];} = {};
      this.header = new HttpHeaders(headerSettings);
  }

  Login(model : any){  
    debugger;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Access-Control-Allow-Origin": "*",
        
      } ),responseType: 'text' as 'json'
    };
  localStorage.setItem("usernameCheck", model.UserName)
   return this.http.post<any>(this.Url+'/Login',model,httpOptions);  
  }  
   CreateUser(register:Register)  
   {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<Register[]>(this.Url + '/Users/', register, httpOptions)  
   }  


}
