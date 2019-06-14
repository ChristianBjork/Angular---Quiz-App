import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { QuizActions } from '../quiz.actions';
import { QuizApiService } from '../quiz-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { TempDataService } from '../service/temp-data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @Input() quizInput: Quiz;
  @Output() quizClicked: EventEmitter<Quiz> = new EventEmitter<Quiz>(); 
 
  quizzes: Quiz[];
  isLoading: boolean;
  

  constructor( private quizActions: QuizActions) { }
    
   
    ngOnInit() { }
    
    deleteQuiz() {
      if(confirm("Are you sure your want to delete " + this.quizInput.title)){
      this.quizActions.deleteQuiz(this.quizInput);
    }
  }
    

  emitQuizClicked() {
    this.quizClicked.emit(this.quizInput);
  }

}
