import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginForm: boolean = false;
  isRegisterForm: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['' , Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    }),
    this.registerForm = this.fb.group({
      email: ['' , Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmEmail: ['' , Validators.required],
      dateOfBithDay: ['' , Validators.required],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    }, {validators: this.passwordMatchValidator, Validators: this.emailMatchValidator});

  }

  ngOnInit() {

  }


  login() {
  if  (this.loginForm.valid)  {}

  }

  goToLoginForm() {
    this.isLoginForm = true;
    this.isRegisterForm = false;
    this.refreshForm();
  }

  gotoRegisterForm() {
    this.isLoginForm = false;
    this.isRegisterForm = true;
    this.refreshForm();
  }

  getForm()  {
    if (this.isLoginForm) {
      return this.loginForm;
    }
      return this.registerForm;
  }

  commumSubmit() {
    if  ( this.isLoginForm) {
      this.login();
    }
  }

  refreshForm() {
    this.getForm();
  }

  passwordMatchValidator(g: FormGroup)  {
    return g.get('password')?.value === g.get('confirmPassword')?.value ?  null : { 'missmatch': true};
  }


  emailMatchValidator(g: FormGroup)  {
    return g.get('email')?.value === g.get('confirmEmail')?.value ?  null : { 'missmatch': true};
  }

}
