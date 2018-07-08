import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TransactionService } from '../../../../../services/transaction/transaction.service';
import { GroupService } from '../../../../../services/group/group.service';
import { UserService } from '../../../../../services/user/user.service';

declare var $: any;

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  constructor(
  	private transactionService: TransactionService,
  	private groupService: GroupService,
  	private userService: UserService
   ) { }

  selected = {};
  active;

  paymentForm: FormGroup = new FormGroup({
    balance: new FormControl(this.userService.user.balance),
    useBalance: new FormControl(false),
    amount: new FormControl(0,[Validators.required, Validators.min(0)])
  });

  ngOnInit() {
  	this.checkComplete();
    this.active = this.groupService.active;  	
    this.groupService.getAllMembers(() => {});
  }

  ngDoCheck() {
    if(this.active !== this.groupService.active) {
    	this.checkComplete();
      this.active = this.groupService.active;
      this.groupService.getAllMembers(() => {});
    }
  }  

  getApprovedTransactions() {
  	this.transactionService.getApprovedTransactions(this.groupService.active._groupId).subscribe(
  		(model: any[]) => {
  			this.transactionService.approved = model;
  		},
  		(err) => {
  			console.log(err);
  		}
  	);
  }

  checkComplete() {
    this.transactionService.checkComplete(this.groupService.active._groupId).subscribe(
      (model) => {
        this.changeStatus();
        console.log(model);
      },
      (err) => {
        console.log(err);
      }
    );    
  }

  changeStatus() {
  	this.transactionService.changeStatus(this.groupService.active._groupId).subscribe(
  		(model) => {
  			this.getApprovedTransactions();
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
      members: []
    }
    this.add(this.selected, i);
  }

  add(selected, i) {
    for(let j = 0 ; j < i.members.length ; j++) {
      selected.members.push(
        {
          email: this.groupService.allMembers[j].email,
          amount: i.members[j].amount
        }
      );
    }
  }

  getUserAmount() {
    var _id = this.userService.user._id;
    for(let i of this.selected['members']) {
      if(i._id == _id) return i.amount;
      else return 0;
    }
  }

  onPay() {
    $("#pay").modal("hide");
    var obj = {
      _id: this.selected['_id'],
      _Uid: this.userService.user._id,
      amount: this.paymentForm.controls.amount.value,
      memberBalance: this.userService.user.balance,
      transactionAmount: this.getUserAmount(),
      checked: this.paymentForm.controls.useBalance.value
    };
    this.transactionService.billPayment(obj).subscribe(
      (model) => {
        console.log(model);
        this.checkComplete();
      },
      (err) => {
        console.log(err)
      }  
    ) 
  }

} 