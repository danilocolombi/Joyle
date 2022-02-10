import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfirmPageComponent } from "./components/confirm-page/confirm-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { UserRegistrationAppComponent } from "./user-registration.app.component";

const routes: Routes = [
 {
     path: '', component: UserRegistrationAppComponent,
     children: [
         {path: 'register', component: RegisterPageComponent},
         {path: 'confirm', component: ConfirmPageComponent}
     ]
 }   
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})
export class UserRegistrationRoutingModule{}