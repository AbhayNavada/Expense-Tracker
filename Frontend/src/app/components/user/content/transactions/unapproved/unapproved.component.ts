import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../../../../services/transaction/transaction.service';
import { GroupService } from '../../../../../services/group/group.service';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
})
export class UnapprovedComponent implements OnInit {

  constructor(
  	private transactionService: TransactionService,
  	private groupService: GroupService,
  	private userService: UserService
   ) { }

  selected = {};
  active;

  ngOnInit() {
  	this.changeStatus();
    this.active = this.groupService.active;  	
    this.groupService.getAllMembers(() => {});
  }

  ngDoCheck() {
    if(this.active !== this.groupService.active) {
    	this.changeStatus();
      this.active = this.groupService.active;
      this.groupService.getAllMembers(() => {});
    }
  }

  getUnapprovedTransactions() {
  	this.transactionService.getUnapprovedTransactions(this.groupService.active._groupId).subscribe(
  		(model: any[]) => {
  			this.transactionService.unapproved = model;
  		},
  		(err) => {
  			console.log(err);
  		}
  	);
  }

  changeStatus() {
  	this.transactionService.changeStatus(this.groupService.active._groupId).subscribe(
  		(model) => {
  			this.getUnapprovedTransactions();
  			console.log(model);
  		},
  		(err) => {
  			console.log(err);
  		}
  	);
  }

  onView(i) {
    let True=0, False=0;
    for(let j of i.poll) {
      if(j.response) True++;
      else False++
    }
    this.selected = {
      _id: i._id,
      transactionName: i.transactionName,
      amount: i.amount,
      expenseDate: i.expenseDate,
      uploadDate: i.uploadDate,
      expenseType: i.expenseType,
      comments: i.comments,
      poll: Math.ceil((True/(True+False))*100),
      members: []
    }
    this.add(this.selected, i);
  }

  getProgress() {
    return {
      'width': this.selected['poll']+'%'
    }
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

  onMove(i) {

  }
}
