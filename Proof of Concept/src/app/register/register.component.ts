import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
    this.rememberMe = true;
  }

  register() {
    // Get the email and password from the component's properties
    const email = this.email;
    const password = this.password;

    // Generate a salt and hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Call the register method of the AuthService, passing the email and hashed password
    this.authService.register(email, hashedPassword).subscribe(
      response => {
        // If the registration is successful, navigate to the login page
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          // If the registration fails, display an alert with the error message
          alert(response.message);
        }
      }
    );
  }
}
