import { UserState } from '../store';
import { tassign } from 'tassign';
import { UserActions } from './user.actions';

const INITIAL_STATE: UserState = {users: [], isLoggedIn: false, isLoading: false}

export function userReducer(state: UserState = INITIAL_STATE, action: any) {
    switch (action.type) {

    case UserActions.USER_REGISTER_LOADING:
        return tassign(state, {isLoading: true});


    case UserActions.USER_REGISTER_SUCCES:
        return tassign(state, { users: [...state.users, action.payload ] });
    
    case UserActions.USER_REGISTER_FAILED:
        return tassign(state, {isLoading: false});

    default:
     return state;
    }
}