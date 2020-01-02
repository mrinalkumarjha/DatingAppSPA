import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  @ViewChild('editForm', { static: false }) editForm: NgForm; // used to reset form once saved

  // it listen to browser event and prompt if accidently user click close browser
  // so prevents unsaved changes from browser close
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.authService.currentPhotoUrl.subscribe(photoUrl => {
        this.photoUrl = photoUrl;
      });

    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      next => {
        this.alertifyService.success('Profile update successfully');
        this.editForm.reset(this.user);
      },
      error => {
        this.alertifyService.error(error);
      }
    );

  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
