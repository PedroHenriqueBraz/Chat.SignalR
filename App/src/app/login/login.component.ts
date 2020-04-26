import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string = '';

  constructor(private router: Router, private loginService: LoginService){}
  
  sendUser() {
    if(this.user) {
      console.log(this.user);
       
      
      // se autenticou com sucesso, entao vou para rota do chat
      this.router.navigate(['/chat']);
    }
  }
}
