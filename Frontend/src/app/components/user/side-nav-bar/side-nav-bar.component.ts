import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../../services/user/user.service';
import { GroupService } from '../../../services/group/group.service';
import { UploadbillComponent } from '../../../components/user/content/uploadbill/uploadbill.component'; 

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  constructor(
  	private userService: UserService,
  	private groupService: GroupService
  ) { }

  cgForm: FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required])
  });

  ngOnInit() {
  }

  onSubmitCG() {
    this.groupService.postTempGroup(this.userService.user._id, this.cgForm.value.name).subscribe(
      (message) => {
        console.log(message);
        alert('Create Group Request sent..!');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  show() {
    if(this.userService.user.group.length) return true;
    else return false;
  }

  checkGH() {
    if(this.show() && this.groupService.active.gh) return true;
    else return false;
  }

  onSelGroup(i) {
    this.groupService.active = i;
    this.groupService.getAllMembers(() => {});
  }

}
