
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars as fasBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser as fasUser } from '@fortawesome/free-solid-svg-icons';
import { faLock as fasLock } from '@fortawesome/free-solid-svg-icons';
import { faPlus as fasPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate as fasArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan as fasTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCheck as fasCheck } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    DashboardComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasBars,fasXmark,fasUser,fasLock, fasPlus, fasArrowsRotate, fasTrashCan, fasCheck );
  }
}
