import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { Subject } from 'rxjs/internal/Subject'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  private user = new BehaviorSubject<string>('john');
  cast = this.user.asObservable();


  constructor(private http: HttpClient) { }
  
  configUrl = 'https://jsonplaceholder.typicode.com/todos';
  loginUrl = 'api/users/login/'

  getPosts() {
    return this.http.get<any>(this.configUrl, {observe: 'response'})
  }

  makeLogin(user: string, pass: string)  {
    const data = {username: user, password: pass};
    const options = {observe: 'response', responseType: 'text'}

    return this.http.post<any>(this.loginUrl, data, {observe: 'response'})
  }

  editUser(newUser){
    this.user.next(newUser);
  }

  

}
