import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizActions } from '../redux/quiz.actions';
import { Quiz } from '../entities/quiz';
import { Gender, User } from '../entities/user';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';


@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {

  createQuiz: FormGroup;
  user: User;
  

  constructor(
    private fb: FormBuilder, 
    private quizActions: QuizActions,
    private router: Router,
    private ngRedux: NgRedux<AppState>
    ) { }


  ngOnInit() {
    this.createQuiz = this.fb.group({
      title: [''],
      questions: this.fb.array([]),
      
    })

    this.ngRedux.select(state => state.users).subscribe(res => {
      this.user = res.currentUser
    })

  }

  saveQuiz() {
    // console.log(this.createQuiz.value);
    
    // save a user who created this quiz.
    // hardcode a user until we have a proper login.
    let quiz = this.createQuiz.value as Quiz;
    quiz.user = this.user
    quiz.like = 10;


    this.quizActions.createQuiz(quiz)
    this.router.navigate(['quiz-portal/quizzes-display']);
    
  }

  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.createQuiz.controls.questions as FormArray;
    const options = question.controls.options as FormArray;
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    
    questions.push(question);
  }
  createNewOption(questionIndex: number){
    const option = this.createNewOptionGroup();
    const questions = this.createQuiz.controls.questions as FormArray;
    
    const options = (<FormArray>questions.controls[questionIndex]).controls['options'] as FormArray;
    
    options.push(option);
  }
  private createNewOptionGroup(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }


 

}
