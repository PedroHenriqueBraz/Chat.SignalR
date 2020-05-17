import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class LoginService {
  private apiLogin = 'http://localhost:5000/account/login';
  my_token = new EventEmitter<String>();
  
  constructor(private http: HttpClient){}

    // envio o usuario para uma API login e recebo um token
    // devo gravar esse token no local storage??
    authenticateUser(user): Observable<any> {
      return this.http.post(this.apiLogin, user);
    }
}