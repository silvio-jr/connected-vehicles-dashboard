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

  logarAutomaticamente:Boolean = false

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

  onChange(){
    this.logarAutomaticamente = !this.logarAutomaticamente
    localStorage.setItem('rememberMe',JSON.stringify(this.logarAutomaticamente))
  }

}
