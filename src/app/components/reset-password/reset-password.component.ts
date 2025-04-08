import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  token: string = '';
  loading: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get f() { return this.resetForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.resetForm.invalid) {
      return;
    }

    const payload = {
      token: this.token,
      nuevaContrasena: this.resetForm.value.password
    };

    this.loading = true;
    this.http.post('http://localhost:8035/restablecer-contrasena', payload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.successMessage = '¡Contraseña restablecida correctamente!';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al restablecer la contraseña. Intenta nuevamente.';
          console.error(error);
        }
      });
  }
}
