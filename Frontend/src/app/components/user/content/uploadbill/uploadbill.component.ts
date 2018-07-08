import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TransactionService } from '../../../../services/transaction/transaction.service';
import { GroupService } from '../../../../services/group/group.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-uploadbill',
  templateUrl: './uploadbill.component.html',
  styleUrls: ['./uploadbill.component.css']
})
export class UploadbillComponent implements OnInit, DoCheck {

  uploadBillForm: FormGroup;
  allMembers;
  active;
  amountSum: number;

  focusTname:boolean;
  focusEamount: boolean;
  focusTdate: boolean;

  currentDate: number;
  transactionDate: number;
  dateValid: boolean = false;
  amountValid: boolean;

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private userService: UserService,
    private groupService: GroupService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.focusTname = false;
    this.focusEamount = false;
    this.focusTdate = false;

    this.amountValid = true;

    this.uploadBillForm = this.formBuilder.group({
      transactionName: [null, [Validators.minLength(1), Validators.required]],
      expenseAmount: [null, [Validators.required, Validators.min(0)]],
      transactionDate: [null, [Validators.required]],
      expenseTypeOptions: ['Rent', [Validators.required]],
      comments: null,
      members: this.formBuilder.array([]) 
    });
    this.active = this.groupService.active;
    this.groupService.getAllMembers(() => {
      this.addMembers(this.groupService.allMembers);
    });
  }

  ngDoCheck() {
    if(this.active !== this.groupService.active) {
      this.uploadBillForm.setControl('members', new FormArray([]));
      this.groupService.getAllMembers(() => {
        this.addMembers(this.groupService.allMembers);
      });
      this.active = this.groupService.active;
    }

    this.dateValidator();
    this.amountValidator();

  }

  get members(): FormArray {
    return this.uploadBillForm.get('members') as FormArray;
  }

  addMembers(members) {
    for(let member of members) {
      this.members.push(
        this.formBuilder.group({
          id: member._id,
          email: member.email,
          amount: [0, [Validators.required, Validators.min(0)]]
        })
      );
    }
  }

  onFocus(i) {
    if (i == 1) {
      if (this.focusTname == false)
        this.focusTname = true;
    } else if (i == 2) {
      if (this.focusEamount == false)
        this.focusEamount = true;
    } else {
      if (this.focusTdate == false)
        this.focusTdate = true;
    }
  }

  dateValidator() {

    this.currentDate = new Date().valueOf();
    this.transactionDate = new Date(this.uploadBillForm.controls.transactionDate.value).valueOf();
     if (this.currentDate - this.transactionDate < 0) {
      this.dateValid = false;
    } else this.dateValid = true;

  }

  amountValidator() {

    this.amountSum = 0;
    for (var i of this.members.value) {
      this.amountSum += i.amount;
      if (i.amount < 0 && this.amountValid == true)
        this.amountValid = false;
    }
    if (this.uploadBillForm.controls.expenseAmount.value != this.amountSum && this.amountValid == true)
      this.amountValid = false;
    if (this.uploadBillForm.controls.expenseAmount.value == this.amountSum)
      this.amountValid = true;
  }

  onSubmit() {
    var obj = {
      _Uid: this.userService.user._id,
      _groupId: this.groupService.active._groupId,
      transactionName: this.uploadBillForm.controls.transactionName.value,
      amount: this.uploadBillForm.controls.expenseAmount.value,
      expenseDate: this.uploadBillForm.controls.transactionDate.value,
      expenseType: this.uploadBillForm.controls.expenseTypeOptions.value,
      comments: this.uploadBillForm.controls.comments.value,
      members: [],
      poll: [],
      status: 0
    };
    for (var i of this.members.value) {
      obj.members.push({
        _id: i.id,
        amount: i.amount
      });
      obj.poll.push({
        _id: i.id,
        response: false
      })
    }
    this.transactionService.postBill(obj).subscribe(
      (model) => {
        alert('Success');
        this.uploadBillForm.reset();
        this.uploadBillForm.setControl('members', new FormArray([]));
        this.groupService.getAllMembers(() => {
          this.addMembers(this.groupService.allMembers);
        });        
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
  //   this.transactionService.getInitialTransactions(this.groupService.active._groupId).subscribe(
  //     (model)=> {
  //       console.log(model);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

 //   this.transactionService.getGroupExpense(this.groupService.active._groupId, 2018).subscribe(
 //     (model) => {
 //       console.log(model);
 //     },
 //     (err) => {
 //       console.log(err);
 //     }
 //   );
 // } 
