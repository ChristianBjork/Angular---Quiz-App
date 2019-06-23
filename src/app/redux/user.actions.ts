import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { UserApiService } from '../service/user-api.service';
import { User } from '../entities/user';
import { QuizActions } from './quiz.actions';

@Injectable({ providedIn: 'root'})
export class UserActions {
    constructor(
        private ngRedux: NgRedux<AppState>,
        private api: UserApiService
) {}

    static USER_REGISTER_LOADING: string = 'USER_REGISTER_LOADING';
    static USER_REGISTER_SUCCES: string = 'USER_REGISTER_SUCCES';
    static USER_REGISTER_FAILED: string = 'USER_REGISTER_FAILED';

    static GET_USERS_LOADING: string = "GET_USERS_LOADING";
    static GET_USERS_SUCCES: string = "GET_USERS_SUCCES";
    static GET_USERS_FAILED: string = "GET_USERS_FAILED";

    static CURRENT_USER_LOGIN_SUCCES: string = "CURRENT_USER_LOGIN_SUCCES";
    static LOG_IN: string = "LOG_IN";

    userRegister(user: User) : void {
        this.ngRedux.dispatch({type: QuizActions.CREATE_QUIZ_LOADING });

        this.api.userRegister(user).subscribe(new_user => {
            console.log(new_user);

        this.ngRedux.dispatch({
            type: UserActions.USER_REGISTER_SUCCES,
            payload: new_user
        })
        }, error => {
            this.ngRedux.dispatch({
                type: UserActions.USER_REGISTER_FAILED,
                payload: error
            })
        });
    }

    getUsers() : void {
        this.ngRedux.dispatch({ type: UserActions.GET_USERS_LOADING });

        this.api.getAllUsers().subscribe(users => {
            console.log(users);
            this.ngRedux.dispatch({
                type: UserActions.GET_USERS_SUCCES,
                payload: users
            })
        }, error => {
            this.ngRedux.dispatch({
                type: UserActions.GET_USERS_FAILED,
                payload: error
            })
        });
    }


    setLoggedIn(isLoggedIn: boolean): void {
        console.log(isLoggedIn);
        
        this.ngRedux.dispatch({
          type: QuizActions.LOG_IN,
          payload: isLoggedIn
        })
    
    }

    currentUser(user: User) : void {
        this.ngRedux.dispatch({
          type: UserActions.CURRENT_USER_LOGIN_SUCCES,
          payload: user
        })
      }



}