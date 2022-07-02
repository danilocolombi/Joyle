import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'user-registration',
    loadChildren: () => import('./user-registration/user-registration.module')
    .then(m => m.UserRegistrationModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
    .then(m => m.AccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
