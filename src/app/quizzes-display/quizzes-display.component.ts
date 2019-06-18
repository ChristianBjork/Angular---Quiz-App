import { Component, OnInit } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { QuizActions } from '../quiz.actions';


@Component({
  selector: 'app-quizzes-display',
  templateUrl: './quizzes-display.component.html',
  styleUrls: ['./quizzes-display.component.css']
})
export class QuizzesDisplayComponent implements OnInit {
  quizzes: Quiz[];
  isLoading: boolean;
  userSearch: string;

  constructor(private ngRedux: NgRedux<AppState>, private quizActions: QuizActions ) { }

  ngOnInit() {
    
    
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
      this.isLoading = result.isLoading;
    });

    this.quizActions.getQuizzes();
    
  }


  handleQuizClicked(quiz: Quiz) : void {
    // Do whatever I want to handle the event.
    console.log(this.userSearch);
    // this.userSearch = 'Hi there'
    console.log(quiz);
  }
}
