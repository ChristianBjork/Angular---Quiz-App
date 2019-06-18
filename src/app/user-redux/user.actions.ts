import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { UserApiService } from '../service/user-api.service';
import { User } from '../entities/user';
import { QuizActions } from '../quiz.actions';

@Injectable({ providedIn: 'root'})
export class UserActions {
    constructor(
        private ngRedux: NgRedux<AppState>,
        private api: UserApiService
) {}

static USER_REGISTER_LOADING: string = 'USER_REGISTER_LOADING';
static USER_REGISTER_SUCCES: string = 'USER_REGISTER_SUCCES';
static USER_REGISTER_FAILED: string = 'USER_REGISTER_FAILED';

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
}