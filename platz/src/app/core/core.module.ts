import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api-service.service';
import { AuthGuard } from './services/auth-guard.service';
import { JwtService } from './services/jwt-service.service';
import { UserService } from './services/user-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './services/http.interceptor';

const modules = [
  FormsModule, ReactiveFormsModule,
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports:[
    modules
  ],
  providers:[  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },  ApiService,
    AuthGuard,
    JwtService,
    UserService,]
})
export class CoreModule { }
