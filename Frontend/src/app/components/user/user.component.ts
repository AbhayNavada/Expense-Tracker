import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
  	private userService: UserService,
  	private groupService: GroupService
  ) { }

  ngOnInit() {
  	this.userService.getUser();
  	if(this.userService.user.group.length) this.groupService.active = this.userService.user.group[0];
  	else this.groupService.active = false;
  }
  
}
