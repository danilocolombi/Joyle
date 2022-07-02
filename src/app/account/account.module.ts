import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomFormsModule } from "ng2-validation";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { AccountAppComponent } from "./account.app.component";
import { AccountRoutingModule } from "./account.route";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { MyAccountComponent } from "./components/my-account/my-account.component";
import { AuthenticationService } from "./services/authentication.service";

@NgModule({
    declarations:[
        AccountAppComponent,
        LoginPageComponent,
        MyAccountComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        ToastrModule,
        HttpClientModule,
        NgxSpinnerModule,
        AccountRoutingModule
    ],
    providers:[
        AuthenticationService
    ]
})
export class AccountModule{}