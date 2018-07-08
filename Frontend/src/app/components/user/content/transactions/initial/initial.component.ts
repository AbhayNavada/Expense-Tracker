import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DomSanitizer  } from '@angular/platform-browser';

import { TransactionService } from '../../../../../services/transaction/transaction.service';
import { GroupService } from '../../../../../services/group/group.service';
import { UserService } from '../../../../../services/user/user.service';

declare var $ :any;

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  constructor(
  	private transactionService: TransactionService,
  	private groupService: GroupService,
  	private userService: UserService,
    private sanitizer: DomSanitizer,    
    private formBuilder: FormBuilder
   ) { }

  active;
  selected = {};
  EditForm: FormGroup;  

  ngOnInit() {
  	this.changeStatus();
    this.active = this.groupService.active;
    this.EditForm = this.formBuilder.group({
      transactionName: [null, [Validators.minLength(1), Validators.required]],
      expenseAmount: [null, [Validators.required, Validators.min(0)]],
      transactionDate: [null, [Validators.required]],
      expenseTypeOptions: ['Rent', [Validators.required]],
      comments: null,
      members: this.formBuilder.array([]) 
    });
    this.groupService.getAllMembers(() => {});
  }

  ngDoCheck() {
    if(this.active !== this.groupService.active) {
    	this.changeStatus();
      this.EditForm.setControl('members', new FormArray([]));
      this.groupService.getAllMembers(() => {});      
      this.active = this.groupService.active;
    }
  }

  get members(): FormArray {
    return this.EditForm.get('members') as FormArray;
  }  

  addMembers(members, i) {
    for(let index=0 ; index < members.length ; index++) {
      this.members.push(
        this.formBuilder.group({
          id: members[index]._id,
          email: members[index].email,
          amount: this.check(i[index])
        })
      );
    }
  }

  check(value) {
    if(value) return value.amount;
    else return 0;
  }  

  checkDateValid(): boolean {
    if (this.EditForm.controls.transactionDate.value > Date()) {
      return false;
    } else return true;
  }


  getInitialTransactions() {
  	this.transactionService.getInitialTransactions(this.groupService.active._groupId).subscribe(
  		(model: any[]) => {
  			this.transactionService.initial = model;
  		},
  		(err) => {
  			console.log(err);
  		}
  	);
  }

  changeStatus() {
  	this.transactionService.changeStatus(this.groupService.active._groupId).subscribe(
  		(model) => {
  			console.log(model);
  			this.getInitialTransactions();
  		},
  		(err) => {
  			console.log(err);
  		}
  	);
  }

	initPoll(i) {
		for(let j of i.poll)
			if(j._id == this.userService.user._id)
				return j.response;
	}  

	togglePoll(i, poll) {
		var obj = {
			_id: i._id,
			poll: {
				_id: this.userService.user._id,
				response: poll
			}
		};
		this.transactionService.updatePoll(obj).subscribe(
			(model) =>{
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

  onEdit(i) {
    $("#view").modal("hide");
    this.EditForm.controls['transactionName'].setValue(i.transactionName);
    this.EditForm.controls['expenseAmount'].setValue(i.amount);
    let date = new Date(i.expenseDate);
    this.EditForm.controls['transactionDate'].setValue(date.getFullYear()+'-'+('0'+date.getMonth()).slice(-2)+'-'+('0'+date.getDate()).slice(-2));
    this.EditForm.controls['expenseTypeOptions'].setValue(i.expenseType);    
    this.EditForm.controls['comments'].setValue(i.comments);    
    this.EditForm.setControl('members', new FormArray([])); 
    this.addMembers(this.groupService.allMembers, i.members);
  }

  onSubmit(i) {
    $("#edit").modal("hide");
    
  }

  onDelete(i) {

  }

}