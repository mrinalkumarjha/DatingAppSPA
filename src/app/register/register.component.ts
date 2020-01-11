import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDaterangepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  // Created partial as BsDaterangepickerConfig has so many required field but we need to use one
  bsConfig: Partial<BsDaterangepickerConfig>;
  // @Input() valuesFromHome: any; // valuesFromHome this name should be same as passed from parent
  // cancelRegister is event emitter used to pass value from child comp to parent
  // note to always import event emitter from angular core.
  // see cancel method i have used this to emit value;
  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlertifyService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // form using form group
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required),

    // }, this.passwordMatchValidator
    // );

    this.bsConfig = {
      containerClass: 'theme-red'
    };

       // Form using form builder
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: [Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      // following will clone registerform into empty object and
      // then we assign it to user object
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        // once registration success login and redirect to member page
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });

      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false); // here i am emiting val false for parent comp. this val can be anything like object
  }

}
