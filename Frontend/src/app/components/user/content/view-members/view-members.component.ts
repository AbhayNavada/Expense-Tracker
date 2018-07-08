import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GroupService } from '../../../../services/group/group.service';

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.css']
})
export class ViewMembersComponent implements OnInit {

	active;

  constructor(
  	private router: Router,
    private groupService: GroupService
  	) { }

  ngOnInit() {

  	this.active = this.groupService.active;
  	console.log(this.active);
  	
  }

}
