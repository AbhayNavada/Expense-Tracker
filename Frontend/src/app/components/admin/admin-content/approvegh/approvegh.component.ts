import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GroupService } from '../../../../services/group/group.service';
import { Group } from '../../../../services/group/group'; 


@Component({
  selector: 'app-approvegh',
  templateUrl: './approvegh.component.html',
  styleUrls: ['./approvegh.component.css']
})
export class ApproveghComponent implements OnInit {

  constructor(
  	private router: Router, 
  	private groupService: GroupService
  ) { }

  ngOnInit() {
  	this.getAllTempGroup();
    console.log(this.groupService.tempAllGroup.length);
  }

  getAllTempGroup() {
  	this.groupService.getAllTempGroup().subscribe(
  		(model) => {
  			this.groupService.tempAllGroup = <Group[]>model;
  		},
  		(err) => {
  			console.log(err);
  		}
  	);
  }

  onAccept(model) {
    this.groupService.postCreateGroupResponse(model, true).subscribe(
      (message) => {
        console.log(message);
        this.getAllTempGroup();             
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
        this.getAllTempGroup();     
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
