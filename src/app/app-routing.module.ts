import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQueryComponent } from './components/create-query/create-query.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: ' ',
    redirectTo: '/query',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'query',
    component: CreateQueryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
