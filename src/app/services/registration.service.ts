import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  readonly BASE_URL = environment.base_url;

  constructor(private http: HttpClient) { }

  register(userData) {
    console.log(userData);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });

    const logon = {
      username: 'sabelo',
      password: '@Khumalo02'
    };

    return this.http.post('https://api-dev.bankzerosa.co.za/phoenix-external/v1/otp/send', userData, { headers: reqHeader });
  }

}
