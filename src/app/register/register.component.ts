import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;
  // @Input() valuesFromHome: any; // valuesFromHome this name should be same as passed from parent
  // cancelRegister is event emitter used to pass value from child comp to parent
  // note to always import event emitter from angular core.
  // see cancel method i have used this to emit value;
  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required),

    });
  }

  register() {
    console.log(this.registerForm.value);
    // console.log(this.model);
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('registration successful..');
    // },
    //   error => {
    //     this.alertify.error(error);
    //   }
    // );
  }

  cancel() {
    this.cancelRegister.emit(false); // here i am emiting val false for parent comp. this val can be anything like object
  }

}
