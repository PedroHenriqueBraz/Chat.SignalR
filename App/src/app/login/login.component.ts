import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = {
    username: '',
    password: ''
  };
 
  constructor(private router: Router,
    private loginService: LoginService,
    private tokenService: TokenService){}
  
  sendUser() {
    if(this.user) {
      console.log(this.user);
      this.loginService.authenticateUser(this.user)
      .subscribe(
        data => {
          console.log(data);
          this.tokenService.setToken(data.token);
          this.router.navigate(['/chat']);
        });
    }
  }
}
