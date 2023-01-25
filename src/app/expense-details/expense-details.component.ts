import { Component, OnInit } from '@angular/core';
import { ExpenseDetailService } from 'src/app/shared/expense-detail.service';
import { FormsModule } from '@angular/forms';
import { ExpenseDetail } from '../shared/expense-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./style.css']
})
export class ExpenseDetailsComponent implements OnInit {

  constructor(public service: ExpenseDetailService,
    private toastr:ToastrService) { }

    user : any;

  ngOnInit(): void {
    this.service.refreshList();
    this.user = localStorage.getItem("usernameCheck")
  }

  populateForm(selectedRecord:ExpenseDetail){
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteExpenseDetail(id)
    .subscribe(
      res => {
        this.service.refreshList();
        this.toastr.error("Deleted successfully", 'Expense Detail Register')
      },
      err => {console.log(err)}
    )
    }
    
  }
}
