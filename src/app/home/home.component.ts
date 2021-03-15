import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { UserRegister } from '../_models/userRegister';
import { User } from '../_models/user';
import { Route, Router } from '@angular/router';

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
  userRegister!: UserRegister;
  model: any = {};

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['' , Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    }),
    this.registerForm = this.fb.group({
      email: ['' , Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      emailConfirmation: ['' , Validators.required],
      birthDate: ['' , Validators.required],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    }, {validators: this.passwordMatchValidator, Validators: this.emailMatchValidator});

  }

  ngOnInit() {

  }


  login() {
  if  (this.loginForm.valid)  {
    this.authService.login(this.model).subscribe( next => {
      //this.alertify.success('logged in sucessfully');
      console.error("login succes")
    }, error => {
       //this.alertify.error(error);
    }, () => {
      console.error("calling route")
        this.router.navigate(['/dashboard']);
    });
  }

  }

  register()  {
    if (this.registerForm.valid)  {
      this.userRegister = Object.assign({}, this.registerForm.value);
      this.userRegister.firstName ='Altiliano';
      this.userRegister.lastName = 'Fonseca';
      console.info(this.userRegister)
      this.authService.register(this.userRegister).subscribe(() =>{
        console.info("register susscessfuly")
      }, error =>{
          console.error(error)
      });
    }
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
    } else {
      this.register();
    }


  }

  refreshForm() {
    this.getForm();
  }

  passwordMatchValidator(g: FormGroup)  {
    return g.get('password')?.value === g.get('confirmPassword')?.value ?  null : { 'missmatch': true};
  }


  emailMatchValidator(g: FormGroup)  {
    return g.get('email')?.value === g.get('emailConfirmation')?.value ?  null : { 'missmatch': true};
  }

}
