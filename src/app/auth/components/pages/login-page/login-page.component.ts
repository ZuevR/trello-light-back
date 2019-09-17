import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { AuthService } from '../../../../shared/services/auth.service';
import { AuthResponse, User } from '../../../../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('showHide', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000)
      ])
    ])
  ]
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitting = false;
  regStatus: string;
  userId: number;
  showSuccess = false;
  userEmail: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.regStatus = params.status;
      this.userId = +params.userId;
    });

    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitting = true;

    const user: User = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    this.authService.login(user).subscribe((response: AuthResponse) => {
      this.form.reset();
      this.router.navigate(['/']);
      this.submitting = false;
    }, () => {
      this.submitting = false;
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  sendVerificationEmail() {
    this.authService.requestNewEmail(this.userId).subscribe((response: AuthResponse) => {
      this.showSuccess = true;
      this.userEmail = response.email;
    });
  }

}
