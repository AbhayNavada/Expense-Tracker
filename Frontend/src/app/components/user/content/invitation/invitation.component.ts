import { Component, OnInit } from '@angular/core';

import { GroupService } from '../../../../services/group/group.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  constructor(
  	private userService: UserService,
  	private groupService: GroupService
  ) { }
  
  ngOnInit() {
    this.getAllTempMembers();
  }

  getAllTempMembers() {
    this.groupService.getAllTempMember(this.userService.user._id).subscribe(
      (model) => {
        this.groupService.tempAllMember = model;
      },
      (err) => {
        console.log(err);
      }
    );    
  }

  getProfile() {
    this.userService.getProfile().subscribe(
      (model) => {
        this.userService.setUser(model);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onAccept(model) {
    this.groupService.postCreateMemberResponse(model, true).subscribe(
      (message) => {
        console.log(message);     
        this.getAllTempMembers();        
        this.getProfile();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onReject(model) {
    this.groupService.postCreateGroupResponse(model, false).subscribe(
      (message) => {
        console.log(message);     
        this.getAllTempMembers();      
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
