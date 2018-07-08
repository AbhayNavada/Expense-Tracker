import { Component, OnInit } from '@angular/core';

import { GroupService } from '../../../services/group/group.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(
  	private userService: UserService,
  	private groupService: GroupService
  ) { }

  ngOnInit() {
  }

}
