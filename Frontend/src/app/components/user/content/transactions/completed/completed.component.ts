import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../../../../services/transaction/transaction.service';
import { GroupService } from '../../../../../services/group/group.service';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  constructor(
  	private transactionService: TransactionService,
  	private groupService: GroupService,
  	private userService: UserService
   ) { }

  selected = {};
  active;

  ngOnInit() {
  	this.getCompletedTransactions();
    this.active = this.groupService.active;  	
  }

  ngDoCheck() {
    if(this.active !== this.groupService.active) {
    	this.getCompletedTransactions();
      this.active = this.groupService.active;
    }
  }  

  getCompletedTransactions() {
  	this.transactionService.getCompletedTransactions(this.groupService.active._groupId).subscribe(
  		(model: any[]) => {
  			this.transactionService.completed = model;
  		},
  		(err) => {
  			console.log(err);
  		}
  	);
  }

  checkComplete() {
    this.transactionService.checkComplete(this.groupService.active._groupId).subscribe(
      (model) => {
        this.getCompletedTransactions();
        console.log(model);
      },
      (err) => {
        console.log(err);
      }
    );    
  }  

  onView(i) {
    this.selected = {
      _id: i._id,
      transactionName: i.transactionName,
      amount: i.amount,
      expenseDate: i.expenseDate,
      uploadDate: i.uploadDate,
      expenseType: i.expenseType,
      comments: i.comments,
    }
  }

}
