import { User } from "../entities/user";
import { UserActions } from './user.actions';
import { userReducer } from './user.reducer';

const deepFreeze = require('deep-freeze');

let testUser: User;

testUser = {
    _id: '1',
    username:'test1',
    email: 'test@mail.com',
    birthDate: new Date(1992, 2, 19)
} as User;


describe('User reducer test', () => {
    it('1.0: Register new user', () => {
        const startState = { users: [], currentUser: new User(), isLoggedIn: false, isLoading: false };
        deepFreeze(startState);
        console.log('startState: ' + startState);


        const actionObject = {
            type: UserActions.USER_REGISTER_SUCCES,
            payload: testUser
        };

        const newStateObject = userReducer(startState, actionObject);

        expect(newStateObject.users.length).toBe(1);
        expect(newStateObject.users[0].username).toBe('test1');


    });
});
