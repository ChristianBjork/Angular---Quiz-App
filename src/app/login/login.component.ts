import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../entities/user';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { UserActions } from '../redux/user.actions';

@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User = new User();
  users: User[];
  userDoesntExist = false;

  // DI - Dependency injection
  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private ngRedux: NgRedux<AppState>,
    private userActions: UserActions) {
  }

  ngOnInit() {
    // get state of users
    this.ngRedux.select(state => state.users).subscribe(res => {
      this.users = res.users;
    });

    // calls the api and store the data in the usersState
    this.userActions.getUsers();  

    // FormBuilder to get values from login inputs
    this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
    });

    
  }

  onSubmit() {

    // store values from login inputs
    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;

    // set currentUser equal to user from database -- if it exists
    const currentUser = this.users.find(cUser => cUser.username === this.user.username && cUser.password === this.user.password)
 

    // if currentUser exist
    if(currentUser !== undefined) {

      // if currentUser is valid
      if(currentUser.username === this.user.username && currentUser.password === this.user.password){
        console.log(currentUser)
        // update currentUser state
        this.userActions.currentUser(currentUser);
        // update setLoggedIn to true
        this.userActions.setLoggedIn(true);
        // navigate to all quizzes
        this.router.navigate(['quiz-portal/quizzes-display']); 
        
      }
      // display error
    } else {
      console.log("Couldn't be found in database!")
      this.userDoesntExist = true;


    }

  }

}
