import { LogedGuard } from '../../guards/loged.guard';
import { authService } from './../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@lomi/material';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { concatMap, mergeMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  public form!: FormGroup;
  error = false;
  errorMessage!: string;

  private allowedUsersTypes:string[] = ["admin"];


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(
    private fb: FormBuilder,
    private authService: authService,
    private LogedGuard: LogedGuard,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }
  login() {
    if (this.form.valid) {
      this.authService
        .login(this.form.value.username, this.form.value.password)
        .pipe(
          mergeMap((res: any) =>
            this.authService.verifyAdmin(res.access_token)
          )
        )
        .subscribe({
          next: (res) => {
            if (!(this.allowedUsersTypes.find((r)=>res.data.attributes.roles))) {
              this.error = true;
              this.errorMessage = `Usuario de tipo ${res.data.type}, no esta autorizado a entrar a la aplicación`;
            } else {
              this.LogedGuard.userRoles = res.data.attributes;
              this.router.navigateByUrl('');
              this.form.reset();
            }
          },
          error: (error) => {
            console.log(error);
            this.error = true;
            this.errorMessage = 'Nombre de usuario y/o contraseña incorrectos';
          },
        });
    }
  }
}
