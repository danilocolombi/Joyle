import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomFormsModule } from "ng2-validation";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { ConfirmPageComponent } from "./components/confirm-page/confirm-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { UserRegistrationService } from "./services/user-registration.service";
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
        CustomFormsModule,
        UserRegistrationRoutingModule,
        ToastrModule,
        HttpClientModule,
        NgxSpinnerModule
    ],
    providers:[
        UserRegistrationService
    ]
})
export class UserRegistrationModule{}