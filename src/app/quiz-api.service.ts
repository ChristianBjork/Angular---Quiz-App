import { Injectable } from '@angular/core';
import { Quiz } from './entities/quiz';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private baseUrl: string = 'http://angular2api2.azurewebsites.net/api/internships';

  constructor(private http: HttpClient) { }
  
  createQuiz(quiz: Quiz) : Observable<any> {
    quiz.customerId = 'chri1';
    quiz.created = new Date();
    return this.http.post(this.baseUrl, quiz);
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl);
  }

  getChosenQuiz(id: string): Observable<Quiz> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.get<Quiz>(url);
  }

  updateQuiz(quiz: Quiz) : Observable<any> {
    return undefined;
  }

  deleteQuiz(id: string) : Observable<any> {
  
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, {responseType: 'text'});
  }

 


}
