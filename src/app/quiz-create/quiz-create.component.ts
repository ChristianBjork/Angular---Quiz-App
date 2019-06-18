import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizActions } from '../quiz.actions';
import { Quiz } from '../entities/quiz';
import { Gender } from '../entities/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {

  createQuiz: FormGroup;
  

  constructor(
    private fb: FormBuilder, 
    private quizActions: QuizActions,
    private router: Router
    ) { }

  saveQuiz() {
    // console.log(this.createQuiz.value);
    
    // save a user who created this quiz.
    // hardcode a user until we have a proper login.
    let quiz = this.createQuiz.value as Quiz;
    quiz.user = {  // Hardcoded. We remove when we have a proper login
      _id: '1', 
      username: 'chris', 
      email: 'c@ve.dk', 
      gender: Gender.FEMALE, 
      birthDate: undefined 
    };


    this.quizActions.createQuiz(quiz)
    this.router.navigate(['/portal/display-quizzes']);
    
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


  ngOnInit() {
    this.createQuiz = this.fb.group({
      title: [''],
      questions: this.fb.array([]),
     
    })
  }

}
