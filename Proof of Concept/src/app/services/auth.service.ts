import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5240/api/Authentication';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Function to handle user login
  login(emailaddress: string, password: string): Observable<any> {
    const body = { emailaddress, password };
    return this.http.post<any>(`${this.baseUrl}/login`, body, this.httpOptions).pipe(
      map(response => {
        // If the response contains a token, store it in local storage and return success
        if (response && response.token) {
          localStorage.setItem('loggedIn', response.token);
          return { success: true };
        } else {
          // If the response does not contain a token, return failure with a message
          return { success: false, message: 'Invalid credentials' };
        }
      }),
      catchError(error => {
        // If an error occurs during the login request, throw an error
        return throwError('Login failed');
      })
    );
  }

  // Function to handle user registration
  register(emailaddress: string, password: string): Observable<any> {
    const body = { emailaddress, password };
    return this.http.post<any>(`${this.baseUrl}/register`, body, this.httpOptions).pipe(
      map(response => {
        // If the response contains a token, store it in local storage and return success
        if (response && response.token) {
          localStorage.setItem('loggedIn', response.token);
          return { success: true };
        } else {
          // If the response does not contain a token, return failure with a message
          return { success: false, message: 'Invalid credentials' };
        }
      }),
      catchError(error => {
        // If an error occurs during the registration request, throw an error
        return throwError('Registration failed');
      })
    );
  }

  // Function to handle user logout
  logout(): void {
    // Remove the 'loggedIn' item from local storage
    localStorage.removeItem('loggedIn');
  }

  // Function to check if the user is authenticated
  isAuthenticated(): boolean {
    // Check if the 'loggedIn' item exists in local storage
    // If it exists, return true, otherwise return false
    return !!localStorage.getItem('loggedIn');
  }
}
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5240/api/authentication';

//   constructor(private http: HttpClient) {}

//   register(user: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, user);
//   }

//   login(user: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, user);
//   }
// }
