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
    this.ngRedux.select(state => state.users).subscribe(res => {
      this.users = res.users;
    });

    this.userActions.getUsers();  

    this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
    });

    
  }

  onSubmit() {

    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;


    const currentUser = this.users.find(cUser => cUser.username === this.user.username && cUser.password === this.user.password)
 

    if(currentUser !== undefined) {

      if(currentUser.username === this.user.username && currentUser.password === this.user.password){
        console.log(currentUser)
        this.userActions.currentUser(currentUser);
        this.userActions.setLoggedIn(true);
        this.router.navigate(['quiz-portal/quizzes-display']); 
        
      }
    } else {
      console.log("Couldn't be found in database!")
      this.userDoesntExist = true;


    }


    // if (this.loginForm.valid) {
      
    //   this.quizActions.setLoggedIn(true);
      
      
    //   // Send the data to the server to verify the user login
    //   // navigate after successful login.
      
    //   if (this.loginForm.value.username === 'admin') {
    //     //log in as admin
        
    //   }
  
    
    //   console.log("First");
    //   this.authService.login(this.loginForm.value.username).subscribe(result => {
    //     console.log(result);
    //     this.router.navigate(['quiz-portal/quizzes-display']);  
    //   });

    //   console.log("Second");
      
    // }
    // else {
    //   // Show error message or something else.

    // }

  }


}
