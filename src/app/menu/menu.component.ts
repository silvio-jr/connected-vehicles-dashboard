import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

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

}
