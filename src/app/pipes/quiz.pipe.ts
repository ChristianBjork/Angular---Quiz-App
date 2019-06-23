import { Pipe, PipeTransform } from '@angular/core';
import { Quiz } from '../entities/quiz';

@Pipe({
  name: 'quizPipe' //used when I apply the pipe(filter)
})
export class QuizPipe implements PipeTransform {

  transform(quizzes: Quiz[], search?: any): any {
    console.log(quizzes);
    console.log(search);
    if (search === undefined) {
      return quizzes;
    }
    
    // Write code that only returns the quiz objects that match the search

    return quizzes.filter(quiz => quiz.title.indexOf(search) !== -1);
  }


}

@Pipe({
  name: 'quizLikesPipe' //used when I apply the pipe(filter)
})
export class QuizLikesPipe implements PipeTransform {

  transform(quizzes: Quiz[], search?: number): any {
    console.log(quizzes);
    console.log(search);
    
    // return non piped quizArray 
    if(!search || search === undefined) {return quizzes;}
 
    // Using Compare Functions to Sort
      quizzes.sort((a: any, b: any) => {
        if(a.like <= b.like) {
          // over 0 means b before a
          return 1;
        }else {
          // under 0 means a before b
          return -1
        }
      });
    
    return quizzes.filter(quiz => quiz.like >= search)
  }


}
