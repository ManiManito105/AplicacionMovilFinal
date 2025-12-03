import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonButton, ReactiveFormsModule
    , IonInput  ]
})
export class LoginPage {

  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Cambiado a email con validación
      password: ['', [Validators.required, Validators.minLength(4)]] // Corregido: array de validadores
    });
  }

  get email() { // Cambiado de username a email
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value; 

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(email, password).subscribe({ 
      next: (res: any) => {
        this.loading = false;
        localStorage.setItem('session', JSON.stringify(res.user));
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.message || 'Login failed. Please try again.';
      }
    });
  }
}