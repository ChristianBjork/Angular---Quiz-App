import { QuizPipe, QuizLikesPipe } from './quiz.pipe';
import { Quiz } from '../entities/quiz';
import { Gender } from '../entities/user';

describe('QuizPipe', () => {
  it('create an instance', () => {
    const pipe = new QuizPipe();
    expect(pipe).toBeTruthy();
  });
});




describe('QuizLikes Pipe Test', () => {
  it('1.0: sort quizzes by amount of likes', () => {

    const testQuiz1: Quiz = {
      _id: '1', 
      visible: false, 
      user: {
        _id:'1',
        username: 'test', 
        email: 'test@mail.dk', 
        gender: Gender.MALE,
        birthDate: new Date(1986,2,6)
      }, 
      title: 'Animals', 
      created: new Date(2019,2,1),
      like: 15,
      questions: [
        {title: 'How many leg does a cow have', 
          options: [
            {answer: '1', correct: false},
            {answer: '2', correct: false},
            {answer: '3', correct: false},
            {answer: '4', correct: true}
          ]},
        {title: 'How long do you need to walk a dog?', 
          options: [
            {answer: 'For 10 minutes', correct: false},
            {answer: 'For 20 minutes', correct: false},
            {answer: 'For 30 minutes', correct: true},
            {answer: 'For 40 minutes', correct: false},
          ]}] 
    } as Quiz;

    const testQuiz2: Quiz = {
      _id: '2', 
      visible: false, 
      user: {
        _id:'2',
        username: 'test2', 
        email: 'test2@mail.dk', 
        gender: Gender.MALE,
        birthDate: new Date(1980,2,6),
        
      }, 
      like: 20,
      title: 'Animals', 
      created: new Date(2019,2,1),
      questions: [
        {title: 'How many leg does a cow have', 
          options: [
            {answer: '1', correct: false},
            {answer: '2', correct: false},
            {answer: '3', correct: false},
            {answer: '4', correct: true}
          ]},
        {title: 'How long do you need to walk a dog?', 
          options: [
            {answer: 'For 10 minutes', correct: false},
            {answer: 'For 20 minutes', correct: false},
            {answer: 'For 30 minutes', correct: true},
            {answer: 'For 40 minutes', correct: false},
          ]}] 
    } as Quiz;

    

    const quizzes: Quiz[] = [];
    quizzes.push(testQuiz1);
    quizzes.push(testQuiz2);
    const pipe = new QuizLikesPipe();

    expect(quizzes[0]._id).toEqual(testQuiz1._id);
    const filteredArray = pipe.transform(quizzes, 2);
    expect(filteredArray[0]._id).toMatch(testQuiz2._id);


  });
});