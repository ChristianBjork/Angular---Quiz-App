import { UserState } from '../store';
import { tassign } from 'tassign';
import { UserActions } from './user.actions';
import { User } from '../entities/user';

const INITIAL_STATE: UserState = {users: [], currentUser: new User(), isLoggedIn: false, isLoading: false, }

export function userReducer(state: UserState = INITIAL_STATE, action: any) {
    switch (action.type) {

    case UserActions.USER_REGISTER_LOADING:
        return tassign(state, {isLoading: true});


    case UserActions.USER_REGISTER_SUCCES:
        return tassign(state, { users: [...state.users, action.payload ] });
    
    case UserActions.USER_REGISTER_FAILED:
        return tassign(state, { isLoading: false });


    case UserActions.GET_USERS_LOADING:
        return tassign(state, { isLoading: true });   

    case UserActions.GET_USERS_SUCCES:
        return tassign(state, { isLoading: false, users: action.payload });   
        
    case UserActions.GET_USERS_FAILED:
        return tassign(state, { isLoading: false });
    

    case UserActions.CURRENT_USER_LOGIN_SUCCES:
        return tassign(state, { currentUser: action.payload });
      
    case UserActions.LOG_IN:
        return tassign(state, { isLoggedIn: action.payload })    

    default:
     return state;
    }
}