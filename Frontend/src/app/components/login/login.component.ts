import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  lForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.minLength(6)])  
  });

  ngOnInit() {
    
  }

  navRegister() {
    this.router.navigate(['register']);
  }

  navForgotPassword() {
    this.router.navigate(['forgotPassword']);
  }

  check(data) {
    if(data.user.email == "admin@admin.com") return true;
    else false;
  }

  onSubmit() {
    if(!this.lForm.valid) {
      if(!this.lForm.controls.email.valid) alert('Email Invalid');
      else alert('Password should have minimum 6 charachters');
    }
    else this.userService.postLogin(this.lForm.value).subscribe(
      (data) => {
        this.userService.auth(data);
        if(this.check(data)) {
          this.router.navigate(['admin']);
        }
        else this.router.navigate(['user']);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

}