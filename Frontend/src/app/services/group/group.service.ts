import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Group } from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  url: string = 'http://127.0.0.1:3000/users';

  token;
  tempGroup: Group = new Group();
  tempMember;
  tempAllGroup: Group[] = [];
  tempAllMember;
  tempGH: Group[] = [];
  allMembers;
  active;

  postTempGroup(id, gName) {
  	this.tempGroup._id = id;
  	this.tempGroup.groupName = gName;
  	this.token = localStorage.getItem('id_token'); 
  	return this.http.post(this.url+'/tempcreategroup', this.tempGroup, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    });
  }

  postTempMember(id) {
    var obj: any = {}
    console.log(id);
    obj._Uid = id;
    obj.groupName = this.active.groupName;
    obj._groupId = this.active._groupId;
    this.token = localStorage.getItem('id_token'); 
    return this.http.post(this.url+'/tempcreatemember', obj, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    });
  }    

  getAllTempGroup() {
   	this.token = localStorage.getItem('id_token'); 
   	return this.http.get(this.url+'/getalltempgroup', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    }); 
  }

  getAllTempMember(id) {
     this.token = localStorage.getItem('id_token'); 
     return this.http.post(this.url+'/getalltempmember', {_id: id},{
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    }); 
  }

  postCreateGroupResponse(model, response) {
    this.token = localStorage.getItem('id_token');
    model.response = response;
    return this.http.post(this.url+'/creategroup', model, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    });
  }

  getAllMembers(callback) {
    this.getCurrentGroupMembers(this.active._groupId).subscribe(
      (model) => {
        this.allMembers = model;
        callback(); 
      },
      (err) => {
        console.log(err);
      }
    );
  }  

  postCreateMemberResponse(model, response) {
    this.token = localStorage.getItem('id_token');
    model.response = response;
    return this.http.post(this.url+'/createmember', model, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    });
  }    

  searchGroupHead(model) {
    this.token = localStorage.getItem('id_token');
    return this.http.post(this.url+'/searchgh', {email: model}, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    }); 
  }

  searchMember(model) {
    this.token = localStorage.getItem('id_token');
    return this.http.post(this.url+'/searchmember', {email: model}, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    }); 
  }

  getCurrentGroupMembers(groupId) {
    this.token = localStorage.getItem('id_token');
    return this.http.post(this.url+'/groupmembers', {_groupId: groupId}, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    });
  }

  postDeleteGH(model) {
    this.token = localStorage.getItem('id_token');
    return this.http.post(this.url+'/deletegh', model, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)      
    });
  }

}
