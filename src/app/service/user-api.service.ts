import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private baseUrl: string = 'http://angular2api2.azurewebsites.net/api/internships';

  constructor(private http: HttpClient) { }
 
    userRegister(user: User) : Observable<any> {

      return this.http.post(this.baseUrl, user)
      
    }

    getAllUsers(): Observable<User[]> {

      return this.http.get<User[]>(this.baseUrl);
    }

    
  
    
}
