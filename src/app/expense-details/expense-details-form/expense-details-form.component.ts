import { Component, OnInit } from '@angular/core';
import { ExpenseDetailService } from 'src/app/shared/expense-detail.service';
import { FormsModule, NgForm } from '@angular/forms'
import { ExpenseDetail } from 'src/app/shared/expense-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expense-details-form',
  templateUrl: './expense-details-form.component.html'
})
export class ExpenseDetailsFormComponent implements OnInit {

  constructor(public service:ExpenseDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    
  }

  onSubmit(form:NgForm){
    this.service.formData.username = localStorage.getItem("usernameCheck") as string;
    debugger;
    if(this.service.formData.expenseId == 0)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form: NgForm){
    this.service.postExpenseDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitet successfully','Expense detail register')
      },
      err => {console.log(err)}
    )
  }

  updateRecord(form: NgForm){
    this.service.putExpenseDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully','Expense detail register')
      },
      err => {console.log(err)}
    )
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new ExpenseDetail();
  }
}
