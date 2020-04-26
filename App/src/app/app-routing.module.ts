import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'chat', component: ChatRoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
