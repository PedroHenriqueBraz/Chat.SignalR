import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

  export class TokenService {

    setToken(token: string) {
      window.localStorage.setItem('token', token);
    }

    getToken(): string{
      return window.localStorage.getItem('token');
    }

    removeToken() {
      window.localStorage.removeItem('token');
    }
  }