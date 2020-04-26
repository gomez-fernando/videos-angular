import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity: any;
  public status: string;
  public token: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.page_title = 'Login';
    this.user = new User(1, '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form) {
    this.userService.signIn(this.user).subscribe(
      (response) => {
        // console.log(this.user);
        // console.log(response);
        // console.log(response);
        if (!response.status || response.status == 'success') {
          this.status = 'success';
          this.identity = response;
          // form.reset();

          // sacar el token
          this.userService.signIn(this.user, true).subscribe(
            (response) => {
              // console.log(response);
              if (!response.status || response.status == 'success') {
                this.token = response;
                // console.log(this.identity);
                // console.log(this.token);
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this.router.navigate(['/inicio']);
              } else {
                this.status = 'error';
              }
            },
            (error) => {
              (this.status = 'error'), console.log(error as any);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        (this.status = 'error'), console.log(error as any);
      }
    );
  }

  logout() {
    this.route.params.subscribe((params) => {
      let sure = +params['sure'];

      if (sure == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        (this.identity = null),
          (this.token = null),
          this.router.navigate(['/inicio']);
      }
    });
  }
}
