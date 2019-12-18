import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = '';
  constructor(private http: HttpClient) { }

  // pipe allow us to chain rxjs operator to our request
  // with rxjs we take response from server transform with help of rxjs operator and pass
  login(model: any) {
    this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((res: any) => {
          const user = res;
          if (user) {
            localStorage.setItem('token', user.token);
          }
        })
      )
  }
}