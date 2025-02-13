import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string; // Variable to store the username entered by the user
  password: string; // Variable to store the password entered by the user
  rememberMe: boolean = false; // Variable to store whether the user wants to be remembered or not
  successMessage: string; // Variable to store a success message
  email: string; // Variable to store the email entered by the user

  constructor(
    private authService: AuthService, // Instance of the AuthService class for authentication
    private router: Router, // Instance of the Router class for navigation
    private route: ActivatedRoute // Instance of the ActivatedRoute class to access route parameters
  ) {
    this.username = ''; // Initialize the username variable
    this.password = ''; // Initialize the password variable
    this.rememberMe = true; // Set rememberMe to true by default
    this.successMessage = ''; // Initialize the successMessage variable
    this.email = ''; // Initialize the email variable
  }


  onSubmit(): void {
    // Validate form inputs
    if (!this.username || !this.password) {
      // Display an error message to the user if username or password is empty
      alert('Please enter a username and password.');
      return;
    }

    const username = this.username; // Store the username in a constant
    const password = this.password; // Store the password in a constant

    this.authService.login(username, password).subscribe(
      response => {
        // Handle the server's response
        if (response.success) {
          // Save user details to localStorage if rememberMe is checked
          if (this.rememberMe) {
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          // Set a flag in local storage indicating that the user is logged in
          localStorage.setItem('loggedIn', 'true');

          // Redirect the user to the product listing page
          this.router.navigate(['/products', 1]);

          alert('Login successful.');
        } else {
          // Display an error message to the user if login is unsuccessful
          alert(response.message);
        }
      },
      error => {
        // Display an error message to the user if there is an error during login
        alert('There was an error.');
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.successMessage = 'Registered successfully.';
      }
    });
  }
}
