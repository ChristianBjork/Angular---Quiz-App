import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Quiz } from '../entities/quiz';
import { QuizApiService } from '../service/quiz-api.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class QuizActions {
constructor (
  private ngRedux: NgRedux<AppState>, 
  private api: QuizApiService, 
  private route: ActivatedRoute) {} 
  
 
  static CREATE_QUIZ_LOADING: string = 'CREATE_QUIZ_LOADING'; 
  static CREATE_QUIZ_SUCCES: string = 'CREATE_QUIZ_SUCCES';
  static CREATE_QUIZ_FAILED: string = 'CREATE_QUIZ_FAILED';

  static UPDATE_QUIZ: string = 'UPDATE_QUIZ'; 

  static DELETE_QUIZ_LOADING: string = 'GET_QUIZZES_LOADING';
  static DELETE_QUIZ_SUCCES: string = 'GET_QUIZZES_SUCCES';
  static DELETE_QUIZ_FAILED: string = 'GET_QUIZZES_FAILED';

  static GET_QUIZZES_LOADING: string = 'GET_QUIZZES_LOADING';
  static GET_QUIZZES_SUCCESS: string = 'GET_QUIZZES_SUCCESS';
  static GET_QUIZZES_FAILED: string = 'GET_QUIZZES_FAILED';

  static CREATE_RATING: string = 'CREATE_RATING'; 
  static LOG_IN: string = 'LOG_IN'; 
  static CREATE_LIKE: string = 'CREATE_LIKE';


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

  deleteQuiz(quiz: Quiz) : void {
    this.ngRedux.dispatch({type: QuizActions.DELETE_QUIZ_LOADING});

    console.log("1");
    this.api.deleteQuiz(quiz._id).subscribe(q => {
      console.log(q);
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

  createQuiz(quiz: Quiz) :void {
    this.ngRedux.dispatch({type: QuizActions.CREATE_QUIZ_LOADING});

    this.api.createQuiz(quiz).subscribe(quiz_created => {
      console.log(quiz_created);
      

    this.ngRedux.dispatch({
      type: QuizActions.CREATE_QUIZ_SUCCES,
      payload: quiz_created
    })
  }, error => {
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_QUIZ_FAILED,
      payload: error
    })
  }); 
  }

  updateLike(quiz: Quiz) {

    this.api.updateQuiz(quiz).subscribe(() => {
      this.ngRedux.dispatch({
        type: QuizActions.UPDATE_QUIZ,
        payload: quiz
      })
    });
    
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_LIKE,
      payload: { quiz }
    })
  }



  // createRating(rating: Rating, quizId: string) {
  //   this.ngRedux.dispatch({
  //     type: QuizActions.CREATE_RATING,
  //     // payload: {rating: rating, quizId: quizId}
  //     payload: {rating, quizId}
  //   })
  // }

 

  

  setLoggedIn(isLoggedIn: boolean): void {
    console.log(isLoggedIn);
    
    this.ngRedux.dispatch({
      type: QuizActions.LOG_IN,
      payload: isLoggedIn
    })

  }
}
