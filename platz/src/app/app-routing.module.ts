import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { DefaultComponent } from './pages/auth/container/default/default.component';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
   { path: '', component: DefaultComponent,
   children:[
     {
       path: 'dashboard',
       canActivate: [AuthGuard],
       loadChildren: () =>
       import('./pages/dashboard/dashboard.module').then(
         (m) => m.DashboardModule
       ),
     },
     {
       path: 'categories',
       canActivate: [AuthGuard],
       loadChildren: () =>
       import('./pages/categories/categories.module').then(
         (m) => m.CategoriesModule
       ),
     },
     {
       path: 'users',
       canActivate: [AuthGuard],
       loadChildren: () =>
       import('./pages/users/users.module').then(
         (m) => m.UsersModule
       ),
     }
   ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
