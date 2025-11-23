import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const req = {
      email: this.email,
      password: this.password
    };

    this.auth.login(req).subscribe({
      next: (res: any) => {
        this.router.navigate(['/tasks']);
      },
      error: () => {
        alert('Invalid login credentials!');
      }
    });
  }
}
