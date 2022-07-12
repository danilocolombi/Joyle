import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomFormsModule } from "ng2-validation";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { NavigationModule } from "../navigation/navigation.module";
import { AccountAppComponent } from "./account.app.component";
import { AccountRoutingModule } from "./account.route";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { MyAccountComponent } from "./components/my-account/my-account.component";
import { AuthenticationService } from "./services/authentication.service";
import { UsernameModalComponent } from './components/username-modal/username-modal.component';
import { MdbModalModule } from "mdb-angular-ui-kit/modal";
import { UserService } from "./services/user.service";
import { FullNameModalComponent } from './components/full-name-modal/full-name-modal.component';

@NgModule({
    declarations:[
        AccountAppComponent,
        LoginPageComponent,
        MyAccountComponent,
        UsernameModalComponent,
        FullNameModalComponent
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
        AccountRoutingModule,
        NavigationModule,
        MdbModalModule

    ],
    providers:[
        AuthenticationService,
        UserService
    ]
})
export class AccountModule{}