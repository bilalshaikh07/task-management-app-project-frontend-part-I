import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullName = '';
  email = '';
  organization = '';
  designation = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const request = {
      FullName: this.fullName,
      Email: this.email,
      Organization: this.organization,
      Designation: this.designation,
      Password: this.password
    };

    console.log("Sending request:", request);

    this.auth.register(request).subscribe({
      next: () => {
        alert('Registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log("Validation error:", err.error);

        // Display backend validation errors
        if (err.error && err.error.errors) {
          const messages = Object.values(err.error.errors)
            .flat()
            .join('\n');
          alert('Registration failed:\n' + messages);
        } else {
          alert('Registration failed!');
        }
      }
    });
  }
}
