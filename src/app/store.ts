import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { quizReducer } from './quiz.reducer';
import { Quiz } from './entities/quiz';
import { userReducer } from './user-redux/user-reducer';
import { User } from './entities/user';


export class UserState {
  users: User [];
  isLoggedIn: boolean;
  isLoading: boolean;
}

export class QuizState {
  isLoggedIn: boolean;
  quizzes: Quiz[];
  isLoading: boolean;
  
  
}
export class AppState {
  quizzes?: QuizState;
  users?: UserState;
}
export const rootReducer = combineReducers<AppState>({
  quizzes: quizReducer,
  router: routerReducer,
  users: userReducer
} as any);