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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
///
import {LoginService} from './provider/login/login.service';
import { GetApiService } from './get-api.service';
import { UserService} from './components/service/user.service';
import { Table1Component } from './components/table-1/table-1.component';
import { Table2Component } from './components/table-2/table-2.component';
import { DetailComponent } from './components/detail/detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
const router : Routes =[
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: '',redirectTo:'/home',pathMatch:'full'},
  { path: 'table1', component: Table1Component},
  { path: 'table2', component: Table2Component},
  { path: 'detail', component: DetailComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin', component: AdminComponent}
 
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    Table1Component,
    Table2Component,
    DetailComponent,
    ProfileComponent,
    AdminComponent
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [LoginService, GetApiService, UserService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
