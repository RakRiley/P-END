import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpModule} from '@angular/http'
///
import {LoginService} from './provider/login/login.service';
import { Table1Component } from './table1/table1.component';
import { Table2Component } from './components/table-2/table-2.component';
const router : Routes =[
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: '',redirectTo:'/home',pathMatch:'full'},

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    Table1Component,
    Table2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    FormsModule,
    HttpModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
