import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { Quiz, Rating } from './entities/quiz';
import { QuizApiService } from './quiz-api.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class QuizActions {
constructor (
  private ngRedux: NgRedux<AppState>, private api: QuizApiService, private route: ActivatedRoute) {} 
  
  static LOG_IN: string = 'LOG_IN'; 
  static CREATE_QUIZ: string = 'CREATE_QUIZ'; 
  static UPDATE_QUIZ: string = 'UPDATE_QUIZ'; 

  static GET_QUIZ_LOADING: string = "GET_QUIZ_LOADING";
  static GET_QUIZ_SUCCES: string = "GET_QUIZ_LOADING";
  static GET_QUIZ_FAILED: string = "GET_QUIZ_FAILED";
  


  static DELETE_QUIZ_LOADING: string = 'GET_QUIZZES_LOADING';
  static DELETE_QUIZ_SUCCES: string = 'GET_QUIZZES_SUCCES';
  static DELETE_QUIZ_FAILED: string = 'GET_QUIZZES_FAILED';

  static GET_QUIZ: string = 'GET_QUIZ';

  static GET_QUIZZES_LOADING: string = 'GET_QUIZZES_LOADING';
  static GET_QUIZZES_SUCCESS: string = 'GET_QUIZZES_SUCCESS';
  static GET_QUIZZES_FAILED: string = 'GET_QUIZZES_FAILED';

  static CREATE_RATING: string = 'CREATE_RATING'; 


  

  getQuizzes() : void {
    this.ngRedux.dispatch({ type: QuizActions.GET_QUIZZES_LOADING }); // start a "spinner"

    // call the ws
    this.api.getAllQuizzes().subscribe(quizzes => {
      console.log(quizzes);
      console.log(quizzes.filter(quiz => quiz.customerId === 'chri1'));
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_SUCCESS,
        payload: quizzes.filter(quiz => quiz.customerId === 'chri1')
      })
    }, error => {
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_FAILED,
        payload: error
      })
    });
  }

  getQuiz(id: string) : void {
    this.ngRedux.dispatch({ type: QuizActions.GET_QUIZZES_LOADING });

    // Get the id from the url
    

    console.log("1");
    console.log(id)
    

    // Find the quiz object based on id
    
    this.api.getChosenQuiz(id).subscribe(quiz => {
      console.log("2");
      console.log(quiz.title)
    this.ngRedux.dispatch({
      type: QuizActions.GET_QUIZ_SUCCES,
      payload: quiz
    })

    }, error => {
      console.log("3");
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_FAILED,
        payload: error
      })
    });
  }
    
  


  deleteQuiz(quiz: Quiz) : void {
    this.ngRedux.dispatch({type: QuizActions.DELETE_QUIZ_LOADING});

    console.log("1");
    this.api.deleteQuiz(quiz._id).subscribe(q => {
      console.log(q);
      //console.log(q._id);
      console.log("2");
      this.ngRedux.dispatch({
        type: QuizActions.DELETE_QUIZ_SUCCES,
        payload: quiz._id
      })
    }, error => {
      console.log("3");
      this.ngRedux.dispatch({
        type: QuizActions.DELETE_QUIZ_FAILED,
        payload: error
      })
    });
    
  }

  createRating(rating: Rating, quizId: string) {
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_RATING,
      // payload: {rating: rating, quizId: quizId}
      payload: {rating, quizId}
    })
  }

  createQuiz(quiz: Quiz) :void {
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_QUIZ,
      payload: quiz
    }); 
  }

  

  setLoggedIn(isLoggedIn: boolean): void {
    console.log(isLoggedIn);
    
    this.ngRedux.dispatch({
      type: QuizActions.LOG_IN,
      payload: isLoggedIn
    })

  }
}
