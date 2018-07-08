import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../../../services/user/user.service';
import { GroupService } from '../../../../services/group/group.service';
import { Group } from '../../../../services/group/group';

@Component({
  selector: 'app-removegh',
  templateUrl: './removegh.component.html',
  styleUrls: ['./removegh.component.css']
})
export class RemoveghComponent implements OnInit {

  constructor(
  	private groupService: GroupService
  ) { }

  delForm: FormGroup = new FormGroup({
    member: new FormControl(null,[Validators.required])
  });

  selGH;
  allMembers;

  ngOnInit() {
  }

  onClick(i) {
    this.selGH = i;
    this.groupService.getCurrentGroupMembers(this.selGH._id).subscribe(
      (model) => {
        this.allMembers = model;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onKey(event: any) { 
    if(event.target.value) {
    	this.groupService.searchGroupHead(event.target.value).subscribe(
    		(model) => {
    			this.groupService.tempGH = <Group[]>model;
    		},
    		(err) => {
    			console.log(err);
    		}
    	);
    } else {
      this.groupService.tempGH = [];
    }
  }

  onSubmit() {
    var obj = {
      _id: this.delForm.value.member._id,
      _Uid: this.selGH._Uid,
      email: this.delForm.value.member.email,
      _groupId: this.selGH._id 
    }
    this.groupService.postDeleteGH(obj).subscribe(
      (message) => {
        console.log(message);
      },
      (err) => {
        console.log(err);
      }
    );

  }

}
