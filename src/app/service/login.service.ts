import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private apiUrl = 'http://192.168.1.1:8080/api/v1/auth/login'; // Add http://

  constructor(private http: HttpClient) { }

  
  loginUser(credentials: Login): Observable<any> {
    return this.http.post(environment.loginApi, credentials, {
      withCredentials: true  // <-- Properly placed in options object
    });
  }
  // loginUser(credentials: Login): Observable<any> {
  //   return this.http.post(environment.loginApi, credentials, {
  //     observe: 'response',  // Get full response (including headers)
  //     withCredentials: true // Required for cookies
  //   }).pipe(
  //     tap(response => {
  //       // Extract JSESSIONID from headers
  //       const cookies = response.headers.get('Set-Cookie');
  //       const jsessionId = this.extractJSessionId(cookies);
  //       console.log('JSESSIONID:', jsessionId); // Verify extraction
  //     })
  //   );
  // }
  // login(credentials: { username: string, password: string }) {
  //   return this.http.post('http://localhost:8080/api/login', credentials, {
  //     observe: 'response',  // Get full response (including headers)
  //     withCredentials: true // Required for cookies
  //   }).pipe(
  //     tap(response => {
  //       // Extract JSESSIONID from headers
  //       const cookies = response.headers.get('Set-Cookie');
  //       const jsessionId = this.extractJSessionId(cookies);
  //       console.log('JSESSIONID:', jsessionId); // Verify extraction
  //     })
  //   );
  // }
  
  // Helper function to extract JSESSIONID
  private extractJSessionId(cookies: string | null): string | null {
    if (!cookies) return null;
    const match = cookies.match(/JSESSIONID=([^;]+)/);
    return match ? match[1] : null;
  }

  
}
