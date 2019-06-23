import { QuizActions } from './quiz.actions';
import { QuizState } from '../store';
import { tassign } from 'tassign';


// The AppState for every time we refresh the app. 
// isLoggedIn = false, quizzes [] is empty, isLoading = false
const INITIAL_STATE: QuizState = {isLoggedIn: false, quizzes: [], isLoading: false }

export function quizReducer(state: QuizState = INITIAL_STATE, action: any) {
 switch (action.type) {


  case QuizActions.DELETE_QUIZ_LOADING:
    return tassign(state, { isLoading: true });
  
    
  case QuizActions.DELETE_QUIZ_SUCCES:
    console.log(action.payload)
    return tassign(state, {isLoading: false, quizzes: state.quizzes.filter(quiz => quiz._id !== action.payload)});


  case QuizActions.DELETE_QUIZ_FAILED:
    return tassign(state, {isLoading: false});


  case QuizActions.GET_QUIZZES_LOADING:
    return tassign(state, { isLoading: true });
  

  case QuizActions.GET_QUIZZES_SUCCESS:
    return tassign(state, {isLoading: false, quizzes: action.payload });


  case QuizActions.GET_QUIZZES_FAILED:
    return tassign(state, {isLoading: false});

  
  case QuizActions.CREATE_QUIZ_LOADING:
    return tassign(state, { isLoading: true });  


  case QuizActions.CREATE_QUIZ_SUCCES:
  // Create a copy of the array with the original quiz objects + action.payload.
  // return a new state object.
    return tassign(state, { quizzes: [...state.quizzes, action.payload] });


  case QuizActions.CREATE_QUIZ_FAILED:
    return tassign(state, {isLoading: false});
  

  case QuizActions.UPDATE_QUIZ:
  // action.payload: new quiz object
  // How to replace an object in an array without mutating state.
    return tassign(state, { quizzes: [...state.quizzes] });

  case QuizActions.LOG_IN:

    // Make a copy of the state
    // Change isLoggedIn variable in the copy.
    console.log(action);
    // Shallow copy of the state object and changes isLoggedIn of the copy.
    return tassign(state, {isLoggedIn: action.payload});


   default:
    return state;
}
}