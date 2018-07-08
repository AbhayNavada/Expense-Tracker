import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserService } from '../../../../services/user/user.service';
import { GroupService } from '../../../../services/group/group.service';
import { Group } from '../../../../services/group/group';

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {

  constructor(
  	private userService: UserService,
  	private groupService: GroupService
  ) { }

  search = new FormControl();

  ngOnInit() {
  }

  onKey(event: any) { 
    if(event.target.value) {
    	this.groupService.searchMember(event.target.value).subscribe(
    		(model) => {
    			this.groupService.tempMember = model;
    		},
    		(err) => {
    			console.log(err);
    		}
    	);
    } else {
      this.groupService.tempMember = [];
    }
  }

  sendInvite(i) {
  	this.groupService.postTempMember(i._id).subscribe(
  		(message) => {
  			console.log(message);
        this.search.reset();
        this.groupService.tempMember = [];
        alert('Invitation sent successfully');        
  		},
  		(err) => {
  			console.log(err);
  		}
  	);
  }

}
