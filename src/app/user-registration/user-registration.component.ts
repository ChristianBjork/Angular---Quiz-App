import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../entities/user';
import { UserActions } from '../redux/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  createUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userActions: UserActions,
    private router: Router) { }

  ngOnInit() {
    this.createUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      email:    ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]],
      // gender:   ['', this.fb.array([])],
      birthDate: ['', Validators.required]
    })
  }

  saveUser(){
    let user = this.createUser.value as User;
    

    this.userActions.userRegister(user)
    this.router.navigate(['/home/login']);
  }



}
