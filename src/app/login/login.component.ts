import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isPasswordVisible:boolean = false

  rememberMe:any = false

  passwordType: 'text' | 'password' = 'password'

  error: string = ''

  login(form: NgForm){
    const username = form.value.username
    const password = form.value.password

    this.authService.authenticate(username,password).subscribe({
      next:(res) => {
        this.router.navigate(['/home'])
      },
      error:(error) => {
        console.log(error)
        this.error = 'Não foi possível logar com usuário e senha.'
      }
    });
    form.reset()
  }

  saveLoginState(){
    localStorage.setItem('rememberMe',this.rememberMe)
  }

  toggleSwitch(){
    this.rememberMe = !this.rememberMe
    console.log(this.rememberMe)
  }

  changePasswordType(){
    if (this.passwordType === 'password'){
      this.passwordType = 'text'
    } else {
      this.passwordType = 'password'
    }
  }

}
