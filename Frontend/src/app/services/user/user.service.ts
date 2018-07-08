import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  url: string = 'http://127.0.0.1:3000/users';
  token: any;
  user: any;

  postMember(member) {
    return this.http.post(this.url+'/member', member, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  postLogin(member) {
    return this.http.post(this.url+'/login', member, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });  
  }

  postEditedProfile(profile) {
    this.token = localStorage.getItem('id_token');
    return this.http.post(this.url+'/editedprofile', profile, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    });
  }

  postPasswordRequest(member) {
    return this.http.post(this.url+'/forgotpassword', member, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
  
  resetPasswordRequest(password) {
    return this.http.post(this.url+'/resetpassword', password, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getProfile() {
   this.token = localStorage.getItem('id_token'); 
   return this.http.get(this.url+'/profile', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type','application/json').append('Authorization',this.token)
    }); 
  }

  auth(data) {
    localStorage.setItem('id_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.token = data.token;
    this.user = data.user;
  }

  setUser(model) {
    localStorage.setItem('user', JSON.stringify(model.user));
    this.user = model.user;    
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.clear();
    this.token = null;
    this.user = null;
  }
}
