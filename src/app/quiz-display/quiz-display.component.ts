import { Component, OnInit } from '@angular/core';
import { Quiz, Question } from '../entities/quiz';
import { TempDataService } from '../service/temp-data.service';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { QuizActions } from '../quiz.actions';
import { QuizApiService } from '../quiz-api.service';


@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.css']
})

export class QuizDisplayComponent implements OnInit {
  quizzes: Quiz[];
  isLoading: boolean;

  
 

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>,
    private quizActions: QuizActions

    ) { }

  
 
 
  ngOnInit() {
    
    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
      this.isLoading = result.isLoading;
    });

    const id = this.route.snapshot.paramMap.get('id');

    this.quizActions.getQuiz(id)
    
    
    
    
    

    

    // Load the quiz in the html
    
    

  }
  


}
