import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'App de vídeos favoritos';
  public identity;
  public token;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }
}
