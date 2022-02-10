import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ConfirmPageComponent } from "./components/confirm-page/confirm-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { UserRegistrationAppComponent } from "./user-registration.app.component";
import { UserRegistrationRoutingModule } from "./user-registration.route";

@NgModule({
    declarations:[
        UserRegistrationAppComponent,
        RegisterPageComponent,
        ConfirmPageComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        UserRegistrationRoutingModule
    ],
    providers:[

    ]
})
export class UserRegistrationModule{}