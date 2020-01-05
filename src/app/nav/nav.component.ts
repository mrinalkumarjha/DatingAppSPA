import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { retry, retryWhen, delay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photourl => {
      this.photoUrl = photourl;
    });
  }

  login() {
    this.authService.login(this.model)
    .pipe(
    retryWhen((err) => err.pipe(delay(5000))) // retry only when error and with delay of 5 sec
    )
    .subscribe(next => {
      this.alertify.success('logged in successfully..');
    },
      error => {
        this.alertify.error(error);
      },
      () => { this.router.navigate(['/members']); }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
