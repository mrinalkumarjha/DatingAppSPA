import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private alertifySercice: AlertifyService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // gettting data from route resolver
    this.route.data.subscribe(data => {
      this.users = data['users'];
    }
    );
    //this.loadUsers();
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   },
  //     error => { this.alertifySercice.error(error); }
  //   );
  // }

}
