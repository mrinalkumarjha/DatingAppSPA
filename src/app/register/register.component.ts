import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input() valuesFromHome: any; // valuesFromHome this name should be same as passed from parent
  // cancelRegister is event emitter used to pass value from child comp to parent
  // note to always import event emitter from angular core.
  // see cancel method i have used this to emit value;
  @Output() cancelRegister = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false); // here i am emiting val false for parent comp. this val can be anything like object
  }

}
