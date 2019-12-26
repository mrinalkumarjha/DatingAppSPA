import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private userService: UserService,
             private alertifyService: AlertifyService,
             private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  // Since we need id as int so added + in call it will get param and convert into int
  loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
        this.user = user;
      },
      error => { this.alertifyService.error(error); }
    );
  }

}
