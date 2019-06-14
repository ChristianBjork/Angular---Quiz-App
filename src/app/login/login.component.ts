import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizActions } from '../quiz.actions';
import { AuthService } from '../auth/auth.service';
// git test 2
@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  // DI - Dependency injection
  constructor(private fb: FormBuilder,
    private router: Router, private authService: AuthService,
    private quizActions: QuizActions) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
      }
    )
  }

  onSubmit() : void {
    
    
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      
      this.quizActions.setLoggedIn(true);
      
      
      // Send the data to the server to verify the user login
      // navigate after successful login.
      
      if (this.loginForm.value.username === 'admin') {
        //log in as admin
        
      }
  
    
      console.log("First");
      this.authService.login().subscribe(result => {
        console.log("Third");
        this.router.navigate(['quiz-portal/quizzes-display']);  
      });

      console.log("Second");
      
    }
    else {
      // Show error message or something else.

    }

  }


}
