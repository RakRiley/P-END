import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpModule } from '@angular/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
///
import {LoginService} from './provider/login/login.service';
import { GetApiService } from './get-api.service';
import { UserService} from './components/service/user.service';
import { Table1Component } from './components/table-1/table-1.component';
import { Table2Component } from './components/table-2/table-2.component';
import { DetailComponent } from './components/detail/detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { DocumnetService } from './components/service/documnet.service';
import { DateService } from './components/service/date.service';
import { SignerService } from './components/service/signer.service';
import { HttpClientModule } from "@angular/common/http";
import { FileService } from './components/service/file.service';
import { MomentModule } from 'angular2-moment';
import { FilterPipe } from './components/filterpipe/filterpipe.component';
import { MyDatePickerModule } from 'mydatepicker-thai';
import { AdminService } from './components/service/admin.service';
import { YearPegService } from './components/service/year-peg.service';
import { FilterPipeii } from './components/filterpipeii/filterpipeii.component';

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
    AdminComponent,
    FilterPipe,
    FilterPipeii,
    
    
  ],
  imports: [
    
    BrowserAnimationsModule,
    NgxMatDrpModule,
    BrowserModule,
    RouterModule.forRoot(router),
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    MomentModule,
    MyDatePickerModule,
    ChartsModule,
    NgbModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      // radius: 100,
      // outerStrokeWidth: 16,
      // innerStrokeWidth: 8,
      // outerStrokeColor: "#78C000",
      // innerStrokeColor: "#C7E596",
      // animationDuration: 300,
    })

  ],
  providers: [LoginService, GetApiService, UserService ,DocumnetService, DateService, FileService, SignerService, AdminService,YearPegService,  
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
