import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user$ = this.usuarioService.retornaUsuario();

  constructor(private usuarioService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  darkenBg:string= ""
  onTop: number = -1
  sidebarWidth:string = ""
  sidebarBg:string = ""

  openMenu():void{
    this.sidebarWidth = "270px"
    this.darkenBg = "rgba(0,0,0,0.4)"
    this.onTop = 1
  }

  closeMenu():void{
    this.sidebarWidth = ""
    this.darkenBg = ""
    this.onTop = -1
  }

  logout() {
    this.usuarioService.logout();
  }

}
