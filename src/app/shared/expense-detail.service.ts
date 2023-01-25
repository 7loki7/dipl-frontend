import { Injectable } from '@angular/core';
import { ExpenseDetail } from './expense-detail.model';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ExpenseDetailService {

  constructor( private http:HttpClient) { }
  formData:ExpenseDetail = new ExpenseDetail()
  list : ExpenseDetail[];
  listExpense : ExpenseDetail[];
  listIncome : ExpenseDetail[];
  usernameCheck : any;

  readonly baseUrl = 'http://localhost:45500/api/ExpenseDetails'

  postExpenseDetail(){
    debugger;
    return this.http.post(this.baseUrl, this.formData);
  }

  putExpenseDetail(){
    return this.http.put(`${this.baseUrl}/${this.formData.expenseId}`, this.formData);
  }

  deleteExpenseDetail(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  sortList(array : ExpenseDetail[]){
    array.forEach(element => {
      debugger;
      if(element.amount > 0) {
        this.listIncome.push(element);}
      else if(element.amount <0) this.listExpense.push(element)       
    });
  }

  refreshList(){
    this.usernameCheck = localStorage.getItem("usernameCheck")
    this.http.get(`${this.baseUrl}/${this.usernameCheck}`)
    .toPromise()
    .then(res => {
      this.list = res as ExpenseDetail[];
    } )
}
}
